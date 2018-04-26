import { Observable } from 'rxjs/Observable';
import { DataSnapshot } from 'firebase/database';
import { FirebaseApp } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

export class Entity {
    public key: string;
    
    public static toSaveable<T extends Entity>(entity: T): T {
        let saveable = {} as T;
        Object.assign(saveable, entity);
        delete saveable.key;
        return saveable;
    }

    protected static fromFirebasePayload<T extends Entity>(payload: DataSnapshot): T {
        let entity = payload.val() as T;
        entity.key = payload.key;
        return entity;
    }

    public static getList<T extends Entity>(db: AngularFireDatabase, listPath: string): Observable<T[]> {
        return db.list(listPath).snapshotChanges().map(
            actions => actions.map(
                a => Entity.fromFirebasePayload<T>(a.payload)
            )
        );
    }

    public static getObject<T extends Entity>(db: AngularFireDatabase, listPath: string, key: string): Observable<T> {
        return db.object<T>(`${listPath}/${key}`).snapshotChanges().map(
            a => Entity.fromFirebasePayload<T>(a.payload)
        );
    }
}
