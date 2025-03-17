import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { emptyProject, Project } from "./Models/project";
import { Asset, emptyAsset } from "./Models/asset";
import { emptyTag, Tag } from "./Models/tag";
import { createAssetWithTagNames, processAssetsWithTagNames } from "./asset-utils";
//import { Tag } from "./Models/tag";


// Interface for the paginated response from the API
interface ProjectsResponse {
  projects: Project[];
  totalProjects: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

@Injectable({
  providedIn:'root'
})

export class DataService {
  projects$: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  project$: BehaviorSubject<Project> = new BehaviorSubject<Project>(emptyProject);

  assets$: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>([]);
  asset$: BehaviorSubject<Asset> = new BehaviorSubject<Asset>(emptyAsset);

  tags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  tag$: BehaviorSubject<Tag> = new BehaviorSubject<Tag>(emptyTag);

  // Pagination state management
  totalPages$: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  currentPage$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  constructor(private http: HttpClient) {}

  createProject(project: Project) {
    this.http.post<Project>(`/api/Projects`, project).subscribe(data => {
      this.project$.next(data);
      // this.assets$.next(data.asset.&values);
    });
  }

  getAllProjects(page: number = 1, pageSize?: number): void {
    const params = new HttpParams().set('page', page.toString());
    if (pageSize) params.set('pageSize', pageSize.toString());

    this.http.get<ProjectsResponse>('/api/Projects', { params }).subscribe(
      (data) => {
        this.projects$.next(data.projects);
        this.currentPage$.next(data.currentPage);
        this.totalPages$.next(data.totalPages);
      }
    );
  }

  getProjectById(id: number) {
    this.http.get<Project>(`/api/Projects/${id}`).subscribe({
      next: (data) => {
        // Process assets in the project
        if (data.assets && data.assets.length > 0) {
          data.assets = processAssetsWithTagNames(data.assets);
        }
        console.log("Project loaded successfully:", data);
        this.project$.next(data);
      },
      error: (err) => {
        console.error("Error loading project:", err);
        // Don't update the BehaviorSubject with invalid data
      }
    });
  }

  // https://www.bacancytechnology.com/qanda/angular/difference-between-behaviorsubject-and-observable
  // Modify this if needed, observables should be fine since this is being pulled at certain times and we don't
  // need to grab the most up to date state

  // chain together what's returned to what's gonna perform the size effects

  // https://www.learnrxjs.io/learn-rxjs/operators/utility/do
  // not modifying data so it'll be an exact copy of the original

  getProjectInfoById(id: number): Observable<Project> {
    return this.http.get<Project>(`/api/Projects/${id}`).pipe(
      tap(data => this.project$.next(data))
    );
  }
  updateProjectById(id: number, project: Project) {
    this.http.put<Project>(`/api/Projects/${id}`, project).subscribe(data => {
      this.project$.next(data);
      // this.assets$.next(data.asset.&values);
    });
  }

  deleteProjectById(id: number) {
    this.http.delete<Project>(`/api/Projects/${id}`).subscribe(data => {
      this.project$.next(data);
      // this.assets$.next(data.asset.&values);
    });
  }

  createAsset(asset: Asset) {
    this.http.post<Asset>(`/api/Assets`, asset).subscribe(data => {
      const processedAsset = createAssetWithTagNames(data);
      this.asset$.next(processedAsset);
    });
  }

  getAllAssets() {
    this.http.get<Asset[]>(`/api/Assets`).subscribe(data => {
      // Process assets to add the assetTagNames property
      const processedAssets = processAssetsWithTagNames(data);
      this.assets$.next(processedAssets);
    });
  }

  getAssetsById(id: number) {
    this.http.get<Asset>(`/api/Assets/${id}`).subscribe(data => {
      // Add the assetTagNames property
      const processedAsset = createAssetWithTagNames(data);
      this.asset$.next(processedAsset);
    });
  }

  updateAssetById(id: number, asset: Asset) {
    this.http.put<Asset>(`/api/Assets/${id}`, asset).subscribe(data => {
      const processedAsset = createAssetWithTagNames(data);
      this.asset$.next(processedAsset);
    });
  }

  deleteAssetById(id: number) {
    this.http.delete<Asset>(`/api/Assets/${id}`).subscribe(data => {
      if (data) {
        const processedAsset = createAssetWithTagNames(data);
        this.asset$.next(processedAsset);
      }
    });
  }

  getAllTags() {
    this.http.get<Tag[]>(`/api/Tags`).subscribe(data => {
      this.tags$.next(data);
    });
  }

  createTag(tag: Tag) {
    const newTag = {
      tagName: tag.tagName,
      color: tag.color
    }
    return this.http.post<Tag>(`/api/Tags`, newTag).subscribe(data => {
      this.tag$.next(data);
      return data;
    });
  }

  updateTag(tag: Tag) {
    return this.updateTagById(tag, tag.tagId);
  }

  updateTagById(tag: Tag, id:number) {
    return this.http.put<Tag>(`/api/Tags/${id}`, tag).subscribe(data => {
      return data;
    });
  }

  deleteTag(tag: Tag) {
    return this.deleteTagById(tag.tagId);
  }

  deleteTagById(id: number) {
    this.http.delete<Tag>(`/api/Tags/${id}`).subscribe(data => {
      return data;
    });
  }

  getAllUniqueTags(): string[] {
    const assets = this.assets$.value;
    const allTags = new Set<string>();

    assets.forEach(asset => {
      if (asset.assetTagNames) {
        asset.assetTagNames.forEach(tag => allTags.add(tag));
      }
    });

    return Array.from(allTags).sort();
  }
}
