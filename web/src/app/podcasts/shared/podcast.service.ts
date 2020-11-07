import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpServiceBase } from "../../shared/base.service";
import { Podcast } from '../../shared/podcast.model';

@Injectable()
export class PodcastService extends HttpServiceBase {

  protected apiUrl(...parts: string[]): string {
    return super.apiUrl('podcasts', ...parts);
  }

  getAll(): Observable<Podcast[]> {
    const url = this.apiUrl();
    console.log(url);
    return this.httpClient.get<Podcast[]>(url);
  }

}
