import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

export class Entity {
    public key: string;

    public static toSaveable<T extends Entity>(entity: T): Object {
        let saveable = Object.assign({}, entity as Object);

        let convertArrays = (object) => {
            for (let item in object) {
                if (Array.isArray(object[item])) {
                    convertArrays(object[item]);
                    object[item] = (object[item] as Array<any>).map(obj => Object.assign({}, obj));
                }
            }
        }

        convertArrays(saveable);

        delete saveable['key'];
        return saveable;
    }

    public static getList<T extends Entity>(db: AngularFirestore, listPath: string): Observable<T[]> {
        return db.collection<T>(listPath).snapshotChanges().map(
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
        return db.collection<T>(listPath).doc<T>(key).valueChanges().map(
            doc => {
                let entity = doc as T;
                entity.key = key;
                return entity;
            }
        );
    }
}
