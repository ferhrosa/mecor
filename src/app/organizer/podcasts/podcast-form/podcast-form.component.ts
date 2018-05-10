import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { collections } from '../../../shared/collections';
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
      let id = params['id'];

      if (id) {
        Entity.getObject<Podcast>(this.db, collections.podcasts, id)
          .subscribe(p => this.podcast = p);
      }
      else {
        this.podcast = new Podcast();
      }
    });
  }

  save(): void {
    let toSave = Entity.toSaveable(this.podcast);

    if (this.podcast.id) {
      this.db.doc<Podcast>(`${collections.podcasts}/${this.podcast.id}`)
        .update(toSave)
        .then(t => {
          console.log(`Podcast updated: ${JSON.stringify(toSave)}`);
          this.router.navigateByUrl('/podcasts');
        });
    }
    else {
      this.db.collection<Podcast>(collections.podcasts)
        .add(toSave)
        .then(t => {
          console.log(`Podcast added: ${t.id}`);
          this.router.navigateByUrl('/podcasts');
        });
      //,(e: any) => console.log(e.message);
    }
  }

  delete() {
    if (confirm('Are you sure you want to delete this podcast?')) {
      this.db.doc<Podcast>(`${collections.podcasts}/${this.podcast.id}`)
        .delete()
        .then(t => {
          console.log(`Podcast removed: ${this.podcast.id}`);
          this.router.navigateByUrl('/podcasts');
        });
    }
  }

  addFeed() {
    this.podcast.feeds = (this.podcast.feeds || []);
    this.podcast.feeds.push(this.feed);
    this.feed = new PodcastFeed();
  }

  removeFeed(feed: PodcastFeed) {
    if (confirm('Are you sure you want to remove this podcast feed?')) {
      this.podcast.feeds.splice(this.podcast.feeds.indexOf(feed));
    }
  }

  addSerie(feed: PodcastFeed) {
    feed.series = (feed.series || []);
    feed.series.push(this.serie);
    this.serie = new PodcastSerie();
  }

  removeSerie(feed: PodcastFeed, serie: PodcastSerie) {
    if (confirm('Are you sure you want to remove this podcast serie?')) {
      feed.series.splice(feed.series.indexOf(serie), 1);
    }
  }

  addPattern(serie: PodcastSerie) {
    let pattern = prompt('Name of the pattern do add:');
    serie.patterns = (serie.patterns || []);
    if (pattern) { serie.patterns.push(pattern); }
  }

  removePattern(serie: PodcastSerie, pattern: string) {
    if (confirm('Are you sure you want to remove this podcast serie pattern?')) {
      serie.patterns.splice(serie.patterns.indexOf(pattern), 1);
    }
  }

}
