
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { FirebaseApp } from '@angular/fire';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';

export class Entity {
    public id: string;

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

        delete saveable.id;
        return saveable;
    }

    public static getList<T extends Entity>(db: AngularFirestore, listPath: string, queryFn?: QueryFn): Observable<T[]> {
        return db.collection<T>(listPath, queryFn).snapshotChanges().pipe(map(
            actions => actions.map(
                a => {
                    let entity = a.payload.doc.data() as T;
                    entity.id = a.payload.doc.id;
                    return entity;
                }
            )
        ));
    }

    public static getObject<T extends Entity>(db: AngularFirestore, listPath: string, id: string): Observable<T> {
        return db.collection<T>(listPath).doc<T>(id).valueChanges().pipe(map(
            doc => {
                let entity = doc as T;
                entity.id = id;
                return entity;
            }
        ));
    }
}
