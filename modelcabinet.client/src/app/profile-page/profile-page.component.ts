import { Component } from '@angular/core';
import { emptyUserDto, UserDto } from '../Interfaces/user-dto';
import { emptyProject, Project } from '../Models/project';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  // displayUser:UserDto = emptyUserDto; // Used to Render the data for future proofing
  displayUser:UserDto = {
    id: '',
    email: 'Testuser@example.com',
    displayName: 'Mr. Test User',
    biography: 'A Very Cool User',
    location: 'At Home!',
    website: 'https://localhost:4200/user',
    avatarUrl: 'https://placehold.co/512x512',
    twitterHandle: 'testUser',
    githubUsername: 'testUser',
    preferredLanguage: 'english',
    timeZone: 'GMT-7',
    dateJoined: new Date(),
    lastActive: new Date(),
    isProfilePublic: false,
    emailNotificationsEnabled: false,
    projectUpdatesEnabled: false,
    newMessageNotificationsEnabled: false
  }; // Used to Render the data for Showcase
  projects:Project[] = [emptyProject,emptyProject,emptyProject,emptyProject] // Used for projects, more future proofing
}
