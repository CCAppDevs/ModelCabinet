import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Project } from "./Models/project";
import { Asset } from "./Models/asset";


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
  project$: BehaviorSubject<Project> = new BehaviorSubject<Project>({
    projectId: 0,
    name: '',
    creationDate: new Date,
    modifiedDate: new Date,
    description: '',
    author: '',
    version: '',
    assets: [],
    shortDescription: '',
    slug: ''
  });

  assets$: BehaviorSubject<Asset[]> = new BehaviorSubject<Asset[]>([]);
  asset$: BehaviorSubject<Asset> = new BehaviorSubject<Asset>({
    assetId: 0,
    name: '',
    path: '',
    dateCreation: new Date,
    dateUpdated: new Date,
    fileSize: 0,
    projectId: 0
  });

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



  getAllProjects(page?: number, pageSize?: number): void {
    // Create HTTP parameters for pagination
    const params = new HttpParams()
      .set('page', page?.toString() || '1') // Page number to start on
      .set('pageSize', pageSize?.toString() || '8'); // Number of projects per page


    // Make the HTTP request with pagination parameters
    this.http.get<ProjectsResponse>('/api/Projects', { params }).subscribe(data => {
      // Update all the BehaviorSubjects with new data
      this.projects$.next(data.projects);
      this.totalPages$.next(data.totalPages);
      this.currentPage$.next(data.currentPage);
    });
  }

  getProjectById(id: number) {
    this.http.get<Project>(`/api/Projects/${id}`).subscribe(data => {
      this.project$.next(data);
      // this.assets$.next(data.asset.&values);
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
      this.asset$.next(data);
    });
  }

  getAllAssets() {
    this.http.get<Asset[]>(`/api/Assets`).subscribe(data => {
      this.assets$.next(data);
    });
  }

  getAssetsById(id: number) {
    this.http.get<Asset>(`/api/Assets/${id}`).subscribe(data => {
      this.asset$.next(data);
    })
  }

  updateAssetById(id:number, asset: Asset) {
    this.http.put<Asset>(`/api/Assets`, asset).subscribe(data => {
      this.asset$.next(data);
    });
  }

  deleteAssetById(id: number) {
    this.http.delete<Asset>(`/api/Assets/${id}`).subscribe(data => {
      this.asset$.next(data);
    });
  }
}
