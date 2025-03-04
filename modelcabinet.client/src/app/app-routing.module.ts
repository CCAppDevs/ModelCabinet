import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProjectListPageComponent } from './projects/project-list-page/project-list-page.component';
import { ProjectPageComponent } from './projects/project-page/project-page.component';
import { ChangelogComponent } from './changelog/changelog.component'
import { HelpProjectComponent } from './Help-Page/Help-Page.component';
import { AssetListComponent } from './asset/asset-list/asset-list.component';
import { AssetDetailComponent } from './asset/asset-detail/asset-detail.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { AboutModelCabinetComponent } from './About-ModelCabinet/About-ModelCabinet.component';
import { TagEditComponent } from './tags/tag-edit/tag-edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// TODO: Change Names to actual Module Names
const routes: Routes = [
  { path: '', pathMatch: "full", component: LandingPageComponent },
  { path: 'LandingPage', redirectTo: '' },
  { path: 'Projects', component: ProjectListPageComponent },
  { path: 'Projects/:id', component: ProjectPageComponent },
  { path: 'About-ModelCabinet', component: AboutModelCabinetComponent },
  { path: 'changelog', component: ChangelogComponent },
  { path: `assets`, component: AssetListComponent },
  { path: 'Help', component: HelpProjectComponent },
  { path: 'Assets', component: AssetListComponent },
  { path: 'Assets/:id', component: AssetDetailComponent},
  { path: 'User', component: ProfilePageComponent },
  { path: 'coming-soon', component: ComingSoonComponent },
  { path: 'Edit-Tags', component:TagEditComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent }
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
