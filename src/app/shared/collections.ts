import { environment } from "../../environments/environment";

let root = `environments/${environment.firebaseEnvironment}/`;

export const collections = {
    podcasts: `${root}podcasts`,
}
