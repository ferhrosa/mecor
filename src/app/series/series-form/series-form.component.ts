import { Component, OnInit } from '@angular/core';
import { Series } from 'src/app/shared/series.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';
import { Entity } from 'src/app/shared/entity.model';
import { collections } from 'src/app/shared/collections';
import { Podcast } from 'src/app/shared/podcast.model';

@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.scss']
})
export class SeriesFormComponent implements OnInit {

  item: Series;
  pattern = '';

  constructor(
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params.id;

      if (id) {
        Entity.getObject<Series>(this.db, collections.series, id)
          .subscribe(p => this.item = p);
      } else {
        this.item = new Series();
      }
    });
  }

  save(): void {
    const toSave = Entity.toSaveable(this.item);

    if (this.item.id) {
      this.db.doc<Series>(`${collections.series}/${this.item.id}`)
        .update(toSave)
        .then(t => {
          console.log(`Series updated: ${JSON.stringify(toSave)}`);
          this.router.navigateByUrl('/series');
        });
    } else {
      this.db.collection<Series>(collections.series)
        .add(toSave)
        .then(t => {
          console.log(`Series added: ${t.id}`);
          this.router.navigateByUrl('/series');
        });
      //,(e: any) => console.log(e.message);
    }
  }

  delete() {
    if (confirm('Are you sure you want to delete this series?')) {
      this.db.doc<Series>(`${collections.series}/${this.item.id}`)
        .delete()
        .then(t => {
          console.log(`Series removed: ${this.item.id}`);
          this.router.navigateByUrl('/series');
        });
    }
  }

}
