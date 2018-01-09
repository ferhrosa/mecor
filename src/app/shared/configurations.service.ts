import { FirebaseAppConfig } from "angularfire2";


const firebasePrefix: string = "firebase-";

export class Configurations {

    public static getFirebaseAppConfig(): FirebaseAppConfig {

        let apiKey = localStorage.getItem(`${firebasePrefix}apiKey`);
        let authDomain = localStorage.getItem(`${firebasePrefix}authDomain`);
        let databaseURL = localStorage.getItem(`${firebasePrefix}databaseURL`);
        let projectId = localStorage.getItem(`${firebasePrefix}projectId`);
        let storageBucket = localStorage.getItem(`${firebasePrefix}storageBucket`);
        let messagingSenderId = localStorage.getItem(`${firebasePrefix}messagingSenderId`);

        // Returns null if at least one of the keys doesn't have a value.
        if (!apiKey || !authDomain || !databaseURL || !projectId || !storageBucket || !messagingSenderId) {
            return null;
        }

        return <FirebaseAppConfig>{ apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId };
    }

    public static setFirebaseAppConfig(config: FirebaseAppConfig) {
        localStorage.setItem(`${firebasePrefix}apiKey`, config.apiKey);
        localStorage.setItem(`${firebasePrefix}authDomain`, config.authDomain);
        localStorage.setItem(`${firebasePrefix}databaseURL`, config.databaseURL);
        localStorage.setItem(`${firebasePrefix}projectId`, config.projectId);
        localStorage.setItem(`${firebasePrefix}storageBucket`, config.storageBucket);
        localStorage.setItem(`${firebasePrefix}messagingSenderId`, config.messagingSenderId);
    }

}
