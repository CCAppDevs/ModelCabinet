import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../../Models/project';


@Component({
  selector: 'app-project-list-page',
  templateUrl: './project-list-page.component.html',
  styleUrl: './project-list-page.component.css'
})
export class ProjectListPageComponent implements OnInit {
  projects$: BehaviorSubject<Project[]>;
  currentPage$: BehaviorSubject<number>;    // Current page number
  totalPages$: BehaviorSubject<number>;     // Total available pages


  constructor(private data: DataService) {
    this.projects$ = this.data.projects$;
    this.currentPage$ = this.data.currentPage$;
    this.totalPages$ = this.data.totalPages$;
  }

  ngOnInit(): void {
    this.loadPage(1);
  }

  loadPage(page: number) {
    if (page < 1) return;
    this.data.getAllProjects(page);
  }

  nextPage() {
    this.loadPage(this.data.currentPage$.value + 1);
  }

  previousPage() {
    this.loadPage(this.data.currentPage$.value - 1);
  }
}
