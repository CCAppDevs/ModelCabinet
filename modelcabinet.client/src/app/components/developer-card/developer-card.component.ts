import { Component, Input } from '@angular/core';

interface Developer {
  login: string;
  avatar_url: string;
  html_url: string;
}

@Component({
  selector: 'app-developer-card',
  templateUrl: './developer-card.component.html',
  styleUrl: './developer-card.component.css'
})

export class DeveloperCardComponent {
  @Input() developer!: Developer;
}
