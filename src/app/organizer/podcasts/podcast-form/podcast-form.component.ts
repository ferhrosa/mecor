import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import { Podcast } from '../../../shared/podcast.model';

@Component({
  selector: 'app-podcast-form',
  templateUrl: './podcast-form.component.html',
  styleUrls: ['./podcast-form.component.scss']
})
export class PodcastFormComponent implements OnInit {

  podcast: Podcast;

  constructor(
    private angularFire: AngularFireDatabase,
    private router: Router,
  ) { }

  ngOnInit() {
    this.podcast = new Podcast();
  }

  form_submit() {
    this.angularFire.list('podcast')
      .push(this.podcast)
      .then(t => {
        console.log(`Podcast added: ${t.key}`);
        this.router.navigateByUrl('/podcasts');
      }),
      (e: any) => console.log(e.message);
  }

}
