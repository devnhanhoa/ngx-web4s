import {environment} from '../../environments/environment';

export class DsLib {
    static getUri(url) {
        if (!url) {
            return '';
        }
        const parser = document.createElement('a');
        parser.href = url;
        return parser.pathname.replace(environment.basename, '');
    }

    constructor() {
    }
}
