import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

export class Entity {
    public key: string;

    public static toSaveable<T extends Entity>(entity: T): T {
        let saveable = {} as T;
        Object.assign(saveable, entity);
        delete saveable.key;
        return saveable;
    }

    public static getList<T extends Entity>(db: AngularFirestore, listPath: string): Observable<T[]> {
        return db.collection(listPath).snapshotChanges().map(
            actions => actions.map(
                a => {
                    let entity = a.payload.doc.data() as T;
                    entity.key = a.payload.doc.id;
                    return entity;
                }
            )
        );
    }

    public static getObject<T extends Entity>(db: AngularFirestore, listPath: string, key: string): Observable<T> {
        return db.collection(listPath).doc(key).valueChanges().map(
            doc => {
                let entity = doc as T;
                entity.key = key;
                return entity;
            }
        );
    }
}
