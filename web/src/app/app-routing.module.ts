import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PodcastFormComponent } from './podcasts/podcast-form/podcast-form.component';
import { PodcastsComponent } from './podcasts/podcasts/podcasts.component';
import { SeriesFormComponent } from './series/series-form/series-form.component';
import { SeriesComponent } from './series/series/series.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // pathMatch: 'full',
    children: [
      {
        path: 'podcasts',
        children: [
          {
            path: '',
            component: PodcastsComponent,
          },
          {
            path: 'add',
            component: PodcastFormComponent,
          },
          {
            path: ':id',
            component: PodcastFormComponent,
          },
        ],
      },
      {
        path: 'series',
        children: [
          {
            path: '',
            component: SeriesComponent,
          },
          {
            path: 'add',
            component: SeriesFormComponent,
          },
          {
            path: ':id',
            component: SeriesFormComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
