import { Entity } from "./entity.model";

export class Podcast extends Entity {
    name: string;
    feeds: Array<PodcastFeed>;
}

export class PodcastFeed {
    url: string;
    series: Array<PodcastSerie>;
}

export class PodcastSerie {
    name: string;
    patterns: Array<string>;
}
