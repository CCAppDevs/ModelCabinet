import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent {

  constructor(private location: Location) {
   
  }

  goBack(): void {
    this.location.back();
  }
}
