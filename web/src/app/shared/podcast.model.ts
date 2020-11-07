export class Podcast {
  id: string;
  name: string;
  feeds: Array<PodcastFeed>;
}

export class PodcastFeed {
  url: string;
  series: Array<PodcastSeries>;
}

export class PodcastSeries {
  name: string;
  patterns: Array<string>;
}
