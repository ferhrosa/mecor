import { FirebaseAppConfig } from "angularfire2";


const firebasePrefix: string = "mecor-firebase-";

export class Configurations {

    static config: FirebaseAppConfig = {};

    static isConfigured(): boolean {
        return !!(this.config.apiKey && this.config.authDomain && this.config.databaseURL && this.config.projectId && this.config.storageBucket && this.config.messagingSenderId);
    }

    public static getFirebaseAppConfig(): FirebaseAppConfig {

        let apiKey = localStorage.getItem(`${firebasePrefix}apiKey`);
        let authDomain = localStorage.getItem(`${firebasePrefix}authDomain`);
        let databaseURL = localStorage.getItem(`${firebasePrefix}databaseURL`);
        let projectId = localStorage.getItem(`${firebasePrefix}projectId`);
        let storageBucket = localStorage.getItem(`${firebasePrefix}storageBucket`);
        let messagingSenderId = localStorage.getItem(`${firebasePrefix}messagingSenderId`);

        // Returns null if at least one of the keys doesn't have a value.
        // if (!apiKey || !authDomain || !databaseURL || !projectId || !storageBucket || !messagingSenderId) {
        //     return null;
        // }

        //this.config = <FirebaseAppConfig>{ apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId };
        this.mapConfig(<FirebaseAppConfig>{ apiKey, authDomain, databaseURL, projectId, storageBucket, messagingSenderId });

        return this.config;
    }

    public static setFirebaseAppConfig(config: FirebaseAppConfig) {
        this.mapConfig(config);

        localStorage.setItem(`${firebasePrefix}apiKey`, config.apiKey);
        localStorage.setItem(`${firebasePrefix}authDomain`, config.authDomain);
        localStorage.setItem(`${firebasePrefix}databaseURL`, config.databaseURL);
        localStorage.setItem(`${firebasePrefix}projectId`, config.projectId);
        localStorage.setItem(`${firebasePrefix}storageBucket`, config.storageBucket);
        localStorage.setItem(`${firebasePrefix}messagingSenderId`, config.messagingSenderId);
    }

    private static mapConfig(config: FirebaseAppConfig) {
        this.config.apiKey = config.apiKey;
        this.config.authDomain = config.authDomain;
        this.config.databaseURL = config.databaseURL;
        this.config.projectId = config.projectId;
        this.config.storageBucket = config.storageBucket;
        this.config.messagingSenderId = config.messagingSenderId;
    }

}
