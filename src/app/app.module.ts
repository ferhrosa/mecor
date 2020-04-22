import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

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
    AngularFirestoreModule, AngularFireAuthModule,
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
