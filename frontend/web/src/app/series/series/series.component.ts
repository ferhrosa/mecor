import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Series } from 'src/app/shared/series.model';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  series: Observable<Series[]>;
  loaded = false;

  constructor() {
    // this.series = Entity.getList<Series>(db, collections.series,
    //   ref => ref.orderBy('name'));

    // this.series.subscribe(() => this.loaded = true);
  }

  ngOnInit() {
  }

}
