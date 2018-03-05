import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Entry} from "@ionic-native/file";
import {Picture} from "../../models/picture";

@Injectable()
export class ServerProvider {

    constructor(public http: HttpClient) {
    }

    uploadToServer(entry: Entry): Promise<Picture> {
        return new Promise<Picture>((resolve, reject) => {
            resolve(new Picture(entry));
        })
    }

    goTo(picture: Picture) {
        console.log("upload picture => ", picture.entry.nativeURL)
    }

}
