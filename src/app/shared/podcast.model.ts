import { Entity } from "./entity.model";

export class Podcast extends Entity {
    name: string;
    feedUrl: string;
    series = new Array<PodcastSerie>();
}

export class PodcastSerie {
    name: string;
    formats = new Array<string>();
}
