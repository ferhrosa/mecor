import { ConsumableType } from "./consumable.model";
import { Entity } from "./entity.model";

export class Consumption extends Entity {
    consumableId: string;
    consumableType: ConsumableType;
    started: boolean | Date | 'Has pendency';
    ended: boolean | Date | 'Has pendency';
}
