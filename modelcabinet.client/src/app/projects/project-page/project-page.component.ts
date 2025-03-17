import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Project } from '../../Models/project';
import { Asset } from '../../Models/asset';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportComponent } from '../../viewport/viewport.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit, OnDestroy {
  projid = 0;
  project$: BehaviorSubject<Project>;
  projectSubscription: Subscription | null = null;
  isLoading = true;

  // Add selected tag property
  selectedTagName: string = '';

  // Computed property for filtered assets
  get filteredAssets(): Asset[] {
    if (!this.project$.value || !this.project$.value.assets) {
      return [];
    }

    if (!this.selectedTagName) {
      return this.project$.value.assets;
    }

    return this.project$.value.assets.filter(asset =>
      asset.assetTagNames && asset.assetTagNames.includes(this.selectedTagName)
    );
  }

  // Computed property for all unique tags in the project
  get uniqueTagNames(): string[] {
    if (!this.project$.value || !this.project$.value.assets) {
      return [];
    }

    const tags = new Set<string>();
    this.project$.value.assets.forEach(asset => {
      if (asset.assetTagNames) {
        asset.assetTagNames.forEach(tag => tags.add(tag));
      }
    });

    return Array.from(tags).sort();
  }

  @ViewChild('viewport') viewport!: ViewportComponent;

  selectedAsset: Asset | null = null;

  setAsset(asset: Asset) {
    this.selectedAsset = { ...asset };
  }

  saveAsset() {
    if (!this.selectedAsset || !this.project$.value) return;

    const updatedAsset = { ...this.selectedAsset, dateUpdated: new Date() };

    this.data.updateAssetById(updatedAsset.assetId, updatedAsset)

    const currentProject = this.project$.value;

    const updatedAssets = currentProject.assets.map(asset =>
      asset.assetId === updatedAsset.assetId ? updatedAsset : asset
    );

    // Emit the updated project state
    this.project$.next({ ...currentProject, assets: updatedAssets });

    // Reset selected asset back to nothing:
    this.selectedAsset = null;
  }

  loadAsset(asset: Asset) {
    this.viewport.load(asset);
  }

  // Reset tag filter
  clearTagFilter() {
    this.selectedTagName = '';
  }

  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) {
    this.project$ = this.data.project$;
  }

  getProjectData(): void {
    this.isLoading = true;
    this.route.paramMap.subscribe(data => {
      this.projid = +data.get('id')!;

      // Add explicit subscription to detect data loading
      this.data.getProjectById(this.projid);
      this.projectSubscription = this.project$.subscribe(project => {
        console.log("Project data loaded:", project);
        this.isLoading = false;
      });
    });
  }

  ngOnInit(): void {
    this.getProjectData();
  }

  ngOnDestroy(): void {
    if (this.projectSubscription) {
      this.projectSubscription.unsubscribe();
    }
  }
}
