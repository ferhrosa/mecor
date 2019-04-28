import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatSidenavModule, MatListModule, MatTabsModule, MatTableModule,
  MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
  MatDatepickerModule, MatNativeDateModule, MAT_DATE_LOCALE,
  MatSelectModule, MatProgressBarModule, MatTooltipModule, MatChipsModule,
} from '@angular/material';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';

import { tokens } from 'src/environments/tokens';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { PodcastsComponent } from './podcasts/podcasts/podcasts.component';
import { PodcastFormComponent } from './podcasts/podcast-form/podcast-form.component';
import { PodcastEpisodesComponent } from './podcasts/podcast-episodes/podcast-episodes.component';
import { SeriesComponent } from './series/series/series.component';
import { SeriesFormComponent } from './series/series-form/series-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    // Angular Material modules
    MatSidenavModule, MatListModule, MatTabsModule, MatTableModule,
    MatButtonModule, MatCardModule, MatIconModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatSelectModule,
    MatProgressBarModule, MatTooltipModule, MatChipsModule,
    // Firebase modules
    AngularFireModule.initializeApp(tokens.firebase),
    AngularFirestoreModule,
    // Application modules
    AppRoutingModule,
    // OrganizerModule,
  ],
  declarations: [
    AppComponent,
    IndexComponent,
    PodcastsComponent,
    PodcastFormComponent,
    PodcastEpisodesComponent,
    SeriesComponent,
    SeriesFormComponent,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
