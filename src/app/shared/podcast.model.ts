import { Entity } from "./entity.model";

export class Podcast extends Entity {
    name: string;
    feedUrl: string;
    series: Array<PodcastSerie>;
}

export class PodcastSerie {
    name: string;
    patterns: Array<string>;
}
