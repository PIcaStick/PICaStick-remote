import {Component, OnInit} from '@angular/core';

import {Entry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";
import {Events} from "ionic-angular";


@Component({
    selector: 'dir-content',
    templateUrl: 'dir-content.html'
})
export class DirContentComponent implements OnInit {

    dirContent: Entry[];
    selectedFile: Entry;

    constructor(private fileSystemProvider: FileSystemProvider,
                private events: Events) {
        this.dirContent = [];
        this.selectedFile = null;
    }

    ngOnInit() {
        this.reloadDirContent('/sdcard');
        this.events.subscribe("picture:add", () => {
            this.pictureAdd();
        });
        this.events.subscribe("picture:del", this.pictureDel);
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
        this.reloadDirContent(dir.fullPath);
    }

    private changeSelectedFile(file: Entry) {
        this.selectedFile = file;
        console.log(this.selectedFile);
    }

    private reloadDirContent(path: string) {
        //this.changeSelectedFile(null);
        this.fileSystemProvider.getEntriesOfDir(path)
            .then(fileOrDir => {
                this.dirContent = fileOrDir;
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }

    private pictureAdd() {
        if (this.selectedFile != null) {
            this.events.publish('picture:add:found', this.selectedFile);
        }
    }

    private pictureDel() {
        if (this.selectedFile != null) {
            this.events.publish('picture:del:found', this.selectedFile);
        }
    }
}
