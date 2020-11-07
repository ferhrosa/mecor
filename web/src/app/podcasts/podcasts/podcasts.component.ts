import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Podcast } from './../../shared/podcast.model';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

  podcasts: Observable<Podcast[]>;
  loaded = false;

  constructor() {
    // this.podcasts = Entity.getList<Podcast>(db, collections.podcasts,
    //   ref => ref.orderBy('name'));

    // this.podcasts.subscribe(() => this.loaded = true);
  }

  ngOnInit() {
  }

}
