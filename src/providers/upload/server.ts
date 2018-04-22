import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Entry} from "@ionic-native/file";
import {Picture} from "../../models/Picture";
import { TokenIdentificationPrivider } from '../token-identification/token-identification';
import { Base64 } from '@ionic-native/base64';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Injectable()
export class ServerProvider {
    // static uriAuthorithy = 'http://192.168.0.25:3000';
    static uriAuthorithy = 'http://10.0.75.1:3000';
    static apiRootPath = '/api';
    static uploadRoute = '/upload';

    constructor(
        private http: HttpClient,
        private tokenIdentification : TokenIdentificationPrivider,
        private base64: Base64,
        private transfer: FileTransfer,
    ) {
    }

    uploadToServer(entry: Entry): Promise<void> {
        const token = this.tokenIdentification.getToken();
        if (!token) {
            return Promise.reject('Unknown token');
        }

        const url = `${ServerProvider.uriAuthorithy}${ServerProvider.apiRootPath}${ServerProvider.uploadRoute}`;


        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'name.jpg',
            headers: {
                'picastick-token': token,
            },
         };
       
         const fileTransfer: FileTransferObject = this.transfer.create();
         return fileTransfer.upload(entry.fullPath, url, options)
          .then((data) => {
            // success
          }, (err) => {
            // error
          });



        // const filePath: string = entry.fullPath;
        // return this.base64.encodeFile(filePath)
        //     .then((base64Image: string) => {
        //         const fd = new FormData();
        //         fd.append('file', base64Image, 'photo.jpg');

        //         const body = fd;
        
        //         return this.http.post(url, body, options).toPromise();
        //     })
        //     .then(response => {
        //         return null; // TODO: resolve image hash
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         throw error;
        //     });
    }

    goTo(picture: Picture) {
        console.log("upload picture => ", picture.entry.nativeURL)
    }

}
