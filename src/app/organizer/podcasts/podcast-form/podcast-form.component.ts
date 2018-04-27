import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { lists } from '../../../shared/lists';
import { Podcast, PodcastSerie } from '../../../shared/podcast.model';
import { Entity } from '../../../shared/entity.model';

@Component({
  selector: 'app-podcast-form',
  templateUrl: './podcast-form.component.html',
  styleUrls: ['./podcast-form.component.scss']
})
export class PodcastFormComponent implements OnInit {

  podcast: Podcast;
  serie = new PodcastSerie();
  pattern = '';

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let key = params['key'];

      if (key) {
        Entity.getObject<Podcast>(this.db, lists.podcast, key)
          .subscribe(p => this.podcast = p);
      }
      else {
        this.podcast = new Podcast();
      }
    });
  }

  save(): void {
    console.dir(this.podcast);

    if (this.podcast.key) {
      this.db.object(`${lists.podcast}/${this.podcast.key}`)
        .update(Entity.toSaveable(this.podcast))
        .then(t => {
          console.log(`Podcast updated: ${this.podcast}`);
          this.router.navigateByUrl('/podcasts');
        });
    }
    else {
      this.db.list(lists.podcast)
        .push(Entity.toSaveable(this.podcast))
        .then(t => {
          console.log(`Podcast added: ${t.key}`);
          this.router.navigateByUrl('/podcasts');
        });
      //,(e: any) => console.log(e.message);
    }
  }

  addSerie() {
    this.podcast.series = (this.podcast.series || []);
    this.podcast.series.push(this.serie);
    this.serie = new PodcastSerie();
  }

  removeSerie(serie: PodcastSerie) {
    this.podcast.series.splice(this.podcast.series.indexOf(serie), 1);
    console.dir(this.podcast.series);
  }

  addPattern(serie: PodcastSerie, pattern: string) {
    serie.patterns = (serie.patterns || []);
    serie.patterns.push(pattern);
    //this.pattern = '';
  }

}
