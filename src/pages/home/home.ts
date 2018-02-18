import {Component} from '@angular/core';

import {File} from '@ionic-native/file';
import {NavController} from "ionic-angular";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    dirContent: any;

    constructor(private file: File,
                public navCtrl: NavController) {
    }

    ionViewWillEnter() {
        this.file.listDir("file:///sdcard","DCIM").then((val) => {
            console.log(JSON.stringify(val));
        }).catch((reason) => {
            console.error(JSON.stringify(reason));
        })
    }

}
