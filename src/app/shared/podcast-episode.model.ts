import { Entity } from "./entity.model";
import { Consumable, ConsumableType } from "./consumable.model";

export class PodcastEpisode extends Consumable {
    podcastKey: string;

    seriesName: string;
    number: string;
    duration: number;

    getType(): ConsumableType { return ConsumableType.Podcast; }
}
