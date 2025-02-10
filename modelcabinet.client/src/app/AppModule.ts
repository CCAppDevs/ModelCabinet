import { HttpClientModule, provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AboutProjectComponent } from "./about-project/about-project.component";
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
        AboutProjectComponent,
        ChangelogComponent,
        ProjectEditComponent,
        AssetListComponent,
        AssetDetailComponent,
        DeveloperCardComponent,
        ContributorsComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule, // For Project Edit Component
        HttpClientModule
    ],
    providers: [provideHttpClient()], // Using this method rather than the module as the module is labeled as depricated
    bootstrap: [AppComponent]
})
export class AppModule {
}
