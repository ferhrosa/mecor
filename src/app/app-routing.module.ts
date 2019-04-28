import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { PodcastsComponent } from './podcasts/podcasts/podcasts.component';
import { PodcastFormComponent } from './podcasts/podcast-form/podcast-form.component';


const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    pathMatch: 'full',
  },
  {
    path: 'podcasts',
    component: PodcastsComponent,
  },
  {
    path: 'podcasts/add',
    component: PodcastFormComponent,
  },
  {
    path: 'podcasts/:id',
    component: PodcastFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
