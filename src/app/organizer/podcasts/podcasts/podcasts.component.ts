import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { lists } from '../../../shared/lists';
import { Podcast } from './../../../shared/podcast.model';


@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

  podcasts: Observable<Podcast[]>;

  constructor(private db: AngularFireDatabase) { 
    this.podcasts = db.list<Podcast>(lists.podcast).valueChanges();
  }

  ngOnInit() {
  }

}
