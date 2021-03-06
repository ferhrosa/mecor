export class Podcast {
  id: string;
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
