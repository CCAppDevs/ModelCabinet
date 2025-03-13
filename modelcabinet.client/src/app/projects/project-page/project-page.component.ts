import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
export class ProjectPageComponent implements OnInit {
  projid = 0;
  project$: BehaviorSubject<Project>;

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

  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) {
    this.project$ = this.data.project$;
  }

  getProjectData(): void {
    this.route.paramMap.subscribe(data => {
      this.projid = +data.get('id')!;
      this.data.getProjectById(this.projid);
      console.log(this.project$, this.projid);
    });
  }

  ngOnInit(): void {
    this.getProjectData();
  }
}
