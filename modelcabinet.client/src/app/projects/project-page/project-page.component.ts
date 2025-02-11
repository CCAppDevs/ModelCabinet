import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../../Models/project';
import { Asset } from '../../Models/asset';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {
  projid = 0;
  project: BehaviorSubject<Project>;

  apiUrl = 'https://localhost:7296/api/Assets';

  selectedAsset: Asset | null = null;

  setAsset(asset: Asset) {
    this.selectedAsset = { ...asset };
  }

  saveAsset() {
      if (!this.selectedAsset || !this.project.value) return;

      const updatedAsset = { ...this.selectedAsset, dateUpdated: new Date() };

      this.http.put(`${this.apiUrl}/${updatedAsset.assetId}`, updatedAsset).subscribe(
        (response) => {
          console.log('Asset updated:', response);

          // Get current project state
          const currentProject = this.project.value;

          // Find the index of the updated asset
          const updatedAssets = currentProject.assets.map(asset =>
            asset.assetId === updatedAsset.assetId ? updatedAsset : asset
          );

          // Emit new project state to trigger UI update
          this.project.next({ ...currentProject, assets: updatedAssets });

          // Reset selected asset
          this.selectedAsset = null;
        },
        (error) => {
          console.error('Error updating asset:', error);
        }
      );

  }


  constructor(private route: ActivatedRoute, private data: DataService, private router: Router, private http: HttpClient) {
    this.project = this.data.project$;
  }

  getProjectData(): void {
    this.route.paramMap.subscribe(data => {
      this.projid = +data.get('id')!;
      this.data.getProjectById(this.projid);
      console.log(this.project, this.projid);
    });
  }

  ngOnInit(): void {
    this.getProjectData();
  }
}
