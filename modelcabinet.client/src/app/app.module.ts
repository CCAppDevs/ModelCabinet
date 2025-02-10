


import { ProjectEditComponent } from './projects/project-edit/project-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AssetListComponent } from './asset/asset-list/asset-list.component';
import { AssetDetailComponent } from './asset/asset-detail/asset-detail.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';

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
    ComingSoonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule // For Project Edit Component
  ],
  providers: [provideHttpClient()], // Using this method rather than the module as the module is labeled as depricated
  bootstrap: [AppComponent]
})
export class AppModule { }
