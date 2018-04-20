import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { Configurations } from '../shared/configurations.service';

import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { PodcastsComponent } from './podcasts/podcasts/podcasts.component';
import { PodcastFormComponent } from './podcasts/podcast-form/podcast-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AngularFireModule.initializeApp(Configurations.getFirebaseAppConfig()),
    AngularFireDatabaseModule,
  ],
  declarations: [
    IndexComponent,
    LayoutComponent,
    PodcastsComponent,
    PodcastFormComponent
  ],
  providers: [
    AngularFireDatabase,
  ]
})
export class OrganizerModule { }
