import { environment } from '../../environments/environment';

const root = `environments/${environment.firebaseEnvironment}/`;

export const collections = {
    podcasts: `${root}podcasts`,
    series: `${root}series`,
};
