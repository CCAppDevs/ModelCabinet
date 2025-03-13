import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Commit {
  sha: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
  };
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChangelogService {
  // Updated to fetch commits from the master branch
  private apiUrl = 'https://api.github.com/repos/CCAppDevs/ModelCabinet/commits?sha=master';

  constructor(private http: HttpClient) { }

  getChangelog(): Observable<Commit[]> {
    return this.http.get<Commit[]>(this.apiUrl);
  }
}



