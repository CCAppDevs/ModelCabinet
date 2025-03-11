import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Asset, emptyAsset } from '../../Models/asset';
import { DataService } from '../../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})
export class AssetDetailComponent {

  @Input() asset: Asset = emptyAsset;
  @Output() editRequested = new EventEmitter<Asset>();

  requestEdit() {
    this.editRequested.emit(this.asset);
  }

  constructor(
    private route: ActivatedRoute,
    private data: DataService,
    private router: Router,
    private http: HttpClient
  ) {
    this.data.getAllAssets();
  }
}
