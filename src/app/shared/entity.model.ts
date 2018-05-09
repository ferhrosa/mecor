
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { FirebaseApp } from 'angularfire2';
import { AngularFirestore } from 'angularfire2/firestore';

export class Entity {
    public key: string;

    public static toSaveable<T extends Entity>(entity: T): T {
        let saveable = Object.assign({}, entity as T);

        let convertArrays = (object) => {
            for (let item in object) {
                if (typeof (object[item]) == "object") {
                    convertArrays(object[item]);
                }

                if (Array.isArray(object[item]) && typeof(object[item][0]) == "object") {
                    object[item] = (object[item] as Array<any>).map(obj => Object.assign({}, obj));
                }
            }
        }

        convertArrays(saveable);

        delete saveable['key'];
        return saveable;
    }

    public static getList<T extends Entity>(db: AngularFirestore, listPath: string): Observable<T[]> {
        return db.collection<T>(listPath).snapshotChanges().pipe(map(
            actions => actions.map(
                a => {
                    let entity = a.payload.doc.data() as T;
                    entity.key = a.payload.doc.id;
                    return entity;
                }
            )
        ));
    }

    public static getObject<T extends Entity>(db: AngularFirestore, listPath: string, key: string): Observable<T> {
        return db.collection<T>(listPath).doc<T>(key).valueChanges().pipe(map(
            doc => {
                let entity = doc as T;
                entity.key = key;
                return entity;
            }
        ));
    }
}
