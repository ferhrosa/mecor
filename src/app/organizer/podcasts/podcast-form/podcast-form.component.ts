import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { lists } from '../../../shared/lists';
import { Podcast, PodcastSerie, PodcastFeed } from '../../../shared/podcast.model';
import { Entity } from '../../../shared/entity.model';

@Component({
  selector: 'app-podcast-form',
  templateUrl: './podcast-form.component.html',
  styleUrls: ['./podcast-form.component.scss']
})
export class PodcastFormComponent implements OnInit {

  podcast: Podcast;
  feed = new PodcastFeed();
  serie = new PodcastSerie();
  pattern = '';

  constructor(
    private db: AngularFirestore,
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

    let toSave = Entity.toSaveable(this.podcast);

    if (this.podcast.key) {
      this.db.doc<Podcast>(`${lists.podcast}/${this.podcast.key}`)
        .update(toSave)
        .then(t => {
          console.log(`Podcast updated: ${JSON.stringify(toSave)}`);
          this.router.navigateByUrl('/podcasts');
        });
    }
    else {
      this.db.collection<Podcast>(lists.podcast)
        .add(toSave)
        .then(t => {
          console.log(`Podcast added: ${t.id}`);
          this.router.navigateByUrl('/podcasts');
        });
      //,(e: any) => console.log(e.message);
    }
  }

  addFeed() {
    this.podcast.feeds = (this.podcast.feeds || []);
    this.podcast.feeds.push(this.feed);
    this.feed = new PodcastFeed();
  }

  removeFeed(feed: PodcastFeed) {
    this.podcast.feeds.splice(this.podcast.feeds.indexOf(feed));
  }

  addSerie(feed: PodcastFeed) {
    feed.series = (feed.series || []);
    feed.series.push(this.serie);
    this.serie = new PodcastSerie();
  }

  removeSerie(feed: PodcastFeed, serie: PodcastSerie) {
    feed.series.splice(feed.series.indexOf(serie), 1);
  }

  addPattern(serie: PodcastSerie) {
    let pattern = prompt('Name of the pattern do add:');
    serie.patterns = (serie.patterns || []);
    if (pattern) { serie.patterns.push(pattern); }
  }

  removePattern(serie: PodcastSerie, pattern: string) {
    serie.patterns.splice(serie.patterns.indexOf(pattern), 1);
  }

}
