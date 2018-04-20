import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigureComponent } from './configure/configure.component';

import { LayoutComponent } from './organizer/layout/layout.component';
import { IndexComponent } from './organizer/index/index.component';
import { PodcastsComponent } from './organizer/podcasts/podcasts/podcasts.component';
import { PodcastFormComponent } from './organizer/podcasts/podcast-form/podcast-form.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: IndexComponent, pathMatch: 'full' },
      { path: 'podcasts', component: PodcastsComponent },
      { path: 'podcasts/add', component: PodcastFormComponent },
      // { path: 'cadastros/categorias', component: CategoriasComponent },
      // { path: 'cadastros/contas', component: ContasComponent },
      // { path: 'cadastros/cartoes', component: CartoesComponent },
    ]
  },
  {
    path: 'configure',
    component: ConfigureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
