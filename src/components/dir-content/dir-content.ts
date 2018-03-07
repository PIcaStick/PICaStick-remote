import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {Entry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";
import {Events} from "ionic-angular";


@Component({
    selector: 'dir-content',
    templateUrl: 'dir-content.html'
})
export class DirContentComponent implements OnInit {
    @Output() changeFile: EventEmitter<Entry>;

    dirContent: Entry[];
    selectedFile: Entry;


    constructor(
        private fileSystemProvider: FileSystemProvider,
    ) {
        this.dirContent = [];
        this.selectedFile = null;
        this.changeFile = new EventEmitter();
    }

    ngOnInit() {
        this.reloadDirContent('/sdcard/DCIM/Camera');
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

    private changeSelectedFile(file?: Entry) {
        this.selectedFile = file;
        this.changeFile.emit(this.selectedFile);
    }

    private reloadDirContent(path: string) {
        this.changeSelectedFile(null);
        this.fileSystemProvider.getEntriesOfDir(path)
            .then(fileOrDir => {
                this.dirContent = fileOrDir;
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }
}
