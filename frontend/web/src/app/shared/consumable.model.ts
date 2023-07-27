import { Entity } from "./entity.model";

export abstract class Consumable extends Entity {
    releaseDate: Date;
    title: string;

    public getType(): ConsumableType { return null; };
}

export enum ConsumableType {
    Podcast = 0,
    Series = 1,
    Movie = 2,
    Comic = 3,
    Book = 4,
}
