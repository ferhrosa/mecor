import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { lists } from '../../../shared/lists';
import { Podcast, PodcastSerie } from '../../../shared/podcast.model';

@Component({
  selector: 'app-podcast-form',
  templateUrl: './podcast-form.component.html',
  styleUrls: ['./podcast-form.component.scss']
})
export class PodcastFormComponent implements OnInit {

  podcast: Podcast;
  serie = new PodcastSerie();

  constructor(
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let key = params['key'];

      if (key) {
        this.db.object(`${lists.podcast}/${key}`).valueChanges().subscribe(o => {
          this.podcast = <Podcast>o;
          this.podcast.key = key;
        });
      }
      else {
        this.podcast = new Podcast();
      }
    });
  }

  form_submit() {
    this.db.list(lists.podcast)
      .push(this.podcast)
      .then(t => {
        console.log(`Podcast added: ${t.key}`);
        this.router.navigateByUrl('/podcasts');
      }),
      (e: any) => console.log(e.message);
  }

  addSerie() {
    this.podcast.series.push(this.serie);
    this.serie = new PodcastSerie();
  }

}
