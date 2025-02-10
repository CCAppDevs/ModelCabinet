import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Developer {
  login: string;
  avatar_url: string;
  html_url: string;
}

@Component({
  selector: 'app-contributors',
  templateUrl: './contributors.component.html',
  styleUrl: './contributors.component.css'
})

export class ContributorsComponent implements OnInit {
  contributors: Developer[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Developer[]>('https://api.github.com/repos/CCAppDevs/ModelCabinet/contributors')
    .subscribe(data => {
      this.contributors = data
    });
  }
}
