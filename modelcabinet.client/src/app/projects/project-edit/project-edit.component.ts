import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { emptyProject, Project } from '../../Models/project';
import { DataService } from '../../data.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

// https://v17.angular.io/api/forms
// This component is meant to represent a form that can create or edit an existing project. This task requires completion of Todo #23

// Basic implementation, needs to be reworked

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrl: './project-edit.component.css'
})

// Editing an existing project means having to pass in the id of the project most likely
// Else whenever creating the new project, you pass in the project to the backend
// Gotta use the service

// Assuming that in the list, the user has the option to click a button to edit on their project
// They'd pass identification about the project for the ProjectEditComponent to use, most likely an id
// With creation, there most likely will be a create button somewhere, where there's no identification passed
export class ProjectEditComponent implements OnInit {
  projectEditFormGroup: FormGroup = new FormGroup({});
  isEditing = false;

  // First, try to grab an existing project
  project: Project = emptyProject;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private router: Router) {
    this.router.events.subscribe(routerevent => {
      if (routerevent instanceof NavigationEnd) {
        this.getProjectData();
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  getProjectData(): void {
    // If project id is -1 or null, which implies there's no project, then create
    // Whatever the url for creating vs editing is will determine the nature of this
    this.route.paramMap.subscribe(paramMap => {
      this.project.projectId = +paramMap.get('id')!;
    });

    this.isEditing = (this.project.projectId == null || this.project.projectId == -1) ? false : true;

    if (this.isEditing && this.project.projectId != null && this.project.projectId != -1) {
      this.dataService.getProjectInfoById(this.project.projectId).subscribe((proj: Project) => {
        this.project = proj;

        // For debugging
        console.log(
          `Name: ${this.project.name}\n
          Description: ${this.project.description}`);
      },
        error => console.error('Error fetching Project:', error)
      );
    }
  }

  // Modify the creation dates and modified dates later
  initForm(): void {
    this.projectEditFormGroup.patchValue({
      name: new FormControl(this.project.name),
      shortDescription: new FormControl(this.project.shortDescription),
      author: new FormControl(this.project.author),

      creationDate: new FormControl(this.project.creationDate),
      modifiedDate: new FormControl(this.project.modifiedDate)
    })
  }

  // Modify here, pass information back to the backend
  onSubmit() {
    console.log("Modify this to update information to the backend");
    if (this.project == null || !this.projectEditFormGroup.valid)
      return;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    const updatedProject : Project = { ...this.project, ...this.projectEditFormGroup.value };

    if (this.isEditing && this.project.projectId != null) {
      this.dataService.updateProjectById(this.project.projectId, updatedProject);
    }
    else {
      this.dataService.createProject(updatedProject);
    }
  }
}
