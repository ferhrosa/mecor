import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';

import { lists } from '../../../shared/lists';
import { Entity } from '../../../shared/entity.model';
import { Podcast } from './../../../shared/podcast.model';


@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {

  podcasts: Observable<Podcast[]>;
  loaded = false;

  constructor(private db: AngularFirestore) {
    this.podcasts = Entity.getList<Podcast>(db, lists.podcast);

    this.podcasts.subscribe(() => this.loaded = true);

    //Entity.getList<Podcast>(db, lists.podcast).subscribe(x => console.dir(x));

    //this.podcasts = db.collection<Podcast>(lists.podcast).valueChanges();

    //     //db.collection<Podcast>(lists.podcast).valueChanges().subscribe(x => console.dir(x));
    //     db.collection<Podcast>(lists.podcast)
    //       .snapshotChanges()
    //       .map(actions => actions.map(
    //         a => a.payload.doc.id
    //       ))
    // //      .subscribe(x => console.dir(x[0].payload.doc.data()))
    // //      .subscribe(x => console.dir(x))
  }

  ngOnInit() {
  }

}
