import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { PodcastsComponent } from './podcasts/podcasts/podcasts.component';
import { PodcastFormComponent } from './podcasts/podcast-form/podcast-form.component';
import { SeriesComponent } from './series/series/series.component';
import { SeriesFormComponent } from './series/series-form/series-form.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
