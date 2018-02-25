import {Component} from '@angular/core';

import {Entry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";
import {NavController} from "ionic-angular";


@Component({
    selector: 'dir-content',
    templateUrl: 'dir-content.html'
})
export class DirContentComponent {

    dirContent: Entry[];

    constructor(private fileSystemProvider: FileSystemProvider,
                public navCtrl: NavController) {
    }

    ionViewWillEnter() {
        this.fileSystemProvider.getFileOrDirFromPath("file:///sdcard/DCIM/Camera").then((fileOrDir) => {
            this.dirContent = fileOrDir;
        });
    }

}
