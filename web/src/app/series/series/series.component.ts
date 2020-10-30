import { Component, OnInit } from '@angular/core';
import { Series } from 'src/app/shared/series.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Entity } from 'src/app/shared/entity.model';
import { collections } from 'src/app/shared/collections';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  series: Observable<Series[]>;
  loaded = false;

  constructor(private db: AngularFirestore) {
    this.series = Entity.getList<Series>(db, collections.series,
      ref => ref.orderBy('name'));

    this.series.subscribe(() => this.loaded = true);
  }

  ngOnInit() {
  }

}
