import { Observable } from 'rxjs/Observable';
import { DataSnapshot } from 'firebase/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

export class Entity {
    private _key: string;
    public get key(): string { return this._key; }
    public set key(value: string) { this._key = value; }

    public static FromFirebasePayload<T extends Entity>(value: DataSnapshot): T {
        let entity = <T>value.val();
        entity.key = value.key;
        return entity;
    }

    public static FromFirebaseSnapshot<T extends Entity>(db: AngularFireDatabase, listPath: string): Observable<T[]> {
        return db.list(listPath).snapshotChanges().map(
            actions => actions.map(
                a => Entity.FromFirebasePayload<T>(a.payload)
            )
        );
    }
}
