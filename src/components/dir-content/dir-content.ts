import {Component} from '@angular/core';

import {DirectoryEntry, Entry, FileEntry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";


@Component({
    selector: 'dir-content',
    templateUrl: 'dir-content.html'
})
export class DirContentComponent {

    dirContent: Entry[];

    constructor(private fileSystemProvider: FileSystemProvider) {
        this.fileSystemProvider.getFileOrDirFromPath("file:///sdcard")
            .then((fileOrDir) => {
                this.dirContent = fileOrDir;
            })
            .catch((reason) => {
                console.error(reason)
            });
    }

    changeDirOrActivate(dirOrFile: Entry) {
        if (dirOrFile.isFile) {
            this.activate(dirOrFile);
        } else {
            this.changeDir(dirOrFile);
        }
    }

    activate(file: Entry) {
        console.log(file);
    }

    changeDir(dir: Entry) {
        this.fileSystemProvider.getFileOrDirFromPath(dir.nativeURL)
            .then((fileOrDir) => {
                this.dirContent = fileOrDir;
            })
            .catch((reason) => {
                console.error(reason.message)
            });
    }

}
