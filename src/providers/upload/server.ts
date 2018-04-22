import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Entry} from "@ionic-native/file";
import {Picture} from "../../models/Picture";
import { TokenIdentificationPrivider } from '../token-identification/token-identification';
import { Base64 } from '@ionic-native/base64';

@Injectable()
export class ServerProvider {
    static uriAuthorithy = '192.168.0.25:3000';
    static apiRootPath = '/api';
    static uploadRoute = '/uplaod';

    constructor(
        private http: HttpClient,
        private tokenIdentification : TokenIdentificationPrivider,
        private base64: Base64,
    ) {
    }

    uploadToServer(entry: Entry): Promise<null> {
        const token = this.tokenIdentification.getToken();
        if (!token) {
            throw 'Unknown token';
        }

        const url = `${ServerProvider.uriAuthorithy}${ServerProvider.apiRootPath}${ServerProvider.uploadRoute}`;
        const options =  {
            headers: {
                'picastick-token': token,
            },
        };

        const filePath: string = entry.fullPath;
        return this.base64.encodeFile(filePath)
            .then((base64Image: string) => {
                const fd = new FormData();
                fd.append('file', base64Image);

                const body = fd;
        
                return this.http.post(url, body, options).toPromise();
            })
            .then(response => {
                return null;
            })
            .catch(error => {
                console.log(error);
                throw error;
            });
    }

    goTo(picture: Picture) {
        console.log("upload picture => ", picture.entry.nativeURL)
    }

}
