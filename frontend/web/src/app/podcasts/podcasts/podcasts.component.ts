import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PodcastService } from '../shared/podcast.service';
import { Podcast } from './../../shared/podcast.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

  podcasts: Observable<Podcast[]>;
  loaded = false;

  constructor(
    private podcastService: PodcastService,
  ) {
    // this.podcasts = Entity.getList<Podcast>(db, collections.podcasts,
    //   ref => ref.orderBy('name'));

    // this.podcasts.subscribe(() => this.loaded = true);
  }

  ngOnInit() {
    this.podcasts = this.podcastService.getAll().pipe(take(1));
  }

}
