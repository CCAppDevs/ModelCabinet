
//orginal



//import { Component } from '@angular/core';

//@Component({
//  selector: 'app-nav-bar',
//  templateUrl: './nav-bar.component.html',
//  styleUrls: ['./nav-bar.component.css']
//})
//export class NavBarComponent {
//}



//chnages added

//import { Component } from '@angular/core';
//import { Router } from '@angular/router';  // Ensure Router is imported

//@Component({
//  selector: 'app-nav-bar',
//  templateUrl: './nav-bar.component.html',
//  styleUrls: ['./nav-bar.component.css']
//})
//export class NavBarComponent {
//  constructor(private router: Router) { }  // Inject the Router service

//  onSearch(): void {
//    // Redirect to the "Coming Soon" page when the search form is submitted
//    this.router.navigate(['/coming-soon']);
//  }
//}


import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private router: Router) { }

  onSearch(event: Event): void {
    event.preventDefault(); // Prevent the form from submitting normally
    this.router.navigate(['/coming-soon']); // Navigate to the "Coming Soon" page
  }
}
