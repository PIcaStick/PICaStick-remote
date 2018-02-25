import {Component} from '@angular/core';

import {Entry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";


@Component({
    selector: 'dir-content',
    templateUrl: 'dir-content.html'
})
export class DirContentComponent {

    dirContent: Entry[];

    constructor(private fileSystemProvider: FileSystemProvider) {
        this.fileSystemProvider.getFileOrDirFromPath("file:///sdcard").then((fileOrDir) => {
            this.dirContent = fileOrDir;
        });
    }

}
