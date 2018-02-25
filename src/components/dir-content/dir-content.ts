import {Component, OnInit} from '@angular/core';

import {Entry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";


@Component({
    selector: 'dir-content',
    templateUrl: 'dir-content.html'
})
export class DirContentComponent implements OnInit {

    dirContent: Entry[];
    selectedFile: Entry;

    constructor(private fileSystemProvider: FileSystemProvider) {
        this.changeSelectedFile(null);
    }

    ngOnInit() {
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
        this.changeSelectedFile(file);
    }

    changeDir(dir: Entry) {
        this.changeSelectedFile(null);
        this.fileSystemProvider.getFileOrDirFromPath(dir.nativeURL)
            .then((fileOrDir) => {
                this.dirContent = fileOrDir;
            })
            .catch((reason) => {
                console.error(reason.message)
            });
    }

    private changeSelectedFile(file: Entry) {
        this.selectedFile = file;
        // TODO: Add an event emitter when the file selection changes
    }

}
