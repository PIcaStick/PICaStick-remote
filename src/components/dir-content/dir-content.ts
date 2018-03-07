import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';

import {Entry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";
import {Events} from "ionic-angular";


@Component({
    selector: 'dir-content',
    templateUrl: 'dir-content.html'
})
export class DirContentComponent implements OnInit, OnDestroy {
    @Output() changeFile: EventEmitter<Entry>;

    dirContent: Entry[];
    selectedFile: Entry;


    constructor(
        private fileSystemProvider: FileSystemProvider,
        private events: Events,
    ) {
        this.dirContent = [];
        this.selectedFile = null;
        this.addPictureHandler = this.addPictureHandler.bind(this);
        this.changeFile = new EventEmitter();
    }

    ngOnInit() {
        this.reloadDirContent('/sdcard/DCIM/Camera');
        this.events.subscribe("picture:add", this.addPictureHandler);
    }

    ngOnDestroy() {
        this.events.unsubscribe("picture:add", this.addPictureHandler);
    }

    addPictureHandler() {
        this.pictureAdd();
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
        this.changeFile.emit(this.selectedFile);
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
}
