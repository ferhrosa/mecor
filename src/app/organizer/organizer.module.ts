import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSidenavModule, MatListModule, MatTabsModule, MatTableModule,
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE,
  MatSelectModule, MatProgressBarModule, MatTooltipModule, MatChipsModule,
} from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { Configurations } from '../shared/configurations.service';

import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { PodcastsComponent } from './podcasts/podcasts/podcasts.component';
import { PodcastFormComponent } from './podcasts/podcast-form/podcast-form.component';
import { PodcastEpisodesComponent } from './podcasts/podcast-episodes/podcast-episodes.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    // Angular Material modules
    MatSidenavModule, MatListModule, MatTabsModule, MatTableModule,
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    MatProgressBarModule, MatTooltipModule, MatChipsModule,
    // Firebase modules
    AngularFireModule.initializeApp(Configurations.getFirebaseAppConfig()),
    AngularFirestoreModule,
  ],
  declarations: [
    IndexComponent,
    LayoutComponent,
    PodcastsComponent,
    PodcastFormComponent,
    PodcastEpisodesComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ]
})
export class OrganizerModule { }
