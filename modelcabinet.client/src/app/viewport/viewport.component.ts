/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { Asset } from '../Models/asset';
import { StlModelViewerComponent } from 'angular-stl-model-viewer';

// @ts-expect-error Using JS Module in Typescript
import * as THREE from 'three';

@Component({
  selector: 'app-viewport',
  templateUrl: './viewport.component.html',
  styleUrl: './viewport.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewportComponent extends StlModelViewerComponent implements OnInit {
  constructor(private _cdr: ChangeDetectorRef, private _eleRef: ElementRef, private _ngZone: NgZone) {
    super(_cdr, _eleRef, _ngZone);

    // change our pixel (ie 4:3, 16:9)
    this.renderer.setPixelRatio(window.devicePixelRatio)

    // add in some shadows to make it easier to see the details
    this.renderer.shadowMap.enabled = true

    // default camera position
    this.camera.position.set(4, 4, 4)

    // default light position
    this.light.position.set(1, 1, 2)

    this.scene.background = new THREE.Color(0xcccccc)
  }

  load(asset: Asset) {
    console.log("loading", asset);
    this.stlModels = [asset.path];
    this.clearScene();
    this.ngOnInit();
  }

  clearScene() {
    this.meshGroup.children.forEach((child: any) => this.meshGroup.remove(child))
    this.scene.children.forEach((child: any) => this.scene.remove(child))
  }
}
