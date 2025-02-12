
import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AssetDetailComponent } from "./asset/asset-detail/asset-detail.component";
import { AssetListComponent } from "./asset/asset-list/asset-list.component";
import { ChangelogComponent } from "./changelog/changelog.component";
import { DeveloperCardComponent } from "./components/developer-card/developer-card.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NavBarComponent } from "./nav-bar/nav-bar.component";
import { ProfilePageComponent } from "./profile-page/profile-page.component";
import { ProjectEditComponent } from "./projects/project-edit/project-edit.component";
import { ProjectListPageComponent } from "./projects/project-list-page/project-list-page.component";
import { ProjectPageComponent } from "./projects/project-page/project-page.component";
import { ContributorsComponent } from "./components/contributors/contributors.component";
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FileSizePipe } from "./Pipes/file-size.pipe";
import { AboutModelCabinetComponent } from "./About-ModelCabinet/About-ModelCabinet.component";
import { ViewportComponent } from "./viewport/viewport.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    ProjectPageComponent,
    ProjectListPageComponent,
    ProfilePageComponent,
    NavBarComponent,
    ChangelogComponent,
    ProfilePageComponent,
    AboutModelCabinetComponent,
    ChangelogComponent,
    ProjectEditComponent,
    AssetListComponent,
    AssetDetailComponent,
    ComingSoonComponent,
    DeveloperCardComponent,
    ContributorsComponent,
    FileSizePipe,
    ViewportComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule // For Project Edit Component
  ],
  providers: [provideHttpClient()], // Using this method rather than the module as the module is labeled as depricated
  bootstrap: [AppComponent]
})
export class AppModule {
}
