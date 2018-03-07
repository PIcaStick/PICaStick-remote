import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {Entry} from "@ionic-native/file";
import {FileSystemProvider} from "../../providers/file-system/file-system";


@Component({
    selector: 'disk-file-picker',
    templateUrl: 'disk-file-picker.html'
})
export class DiskFilePickerComponent implements OnInit {
    @Output() changeSelectedFile: EventEmitter<Entry>;

    directoryEntries: Entry[];
    selectedFile: Entry;


    constructor(
        private fileSystemProvider: FileSystemProvider,
    ) {
        this.directoryEntries = [];
        this.selectedFile = null;
        this.changeSelectedFile = new EventEmitter();
    }

    ngOnInit() {
        this.reloadDirectoryEntries('/sdcard/DCIM/Camera');
    }

    onClickEntry(entry: Entry) {
        if (entry.isFile) {
            this.setSelectedFile(entry);
        } else {
            this.reloadDirectoryEntries(entry.fullPath);
        }
    }

    private setSelectedFile(file?: Entry) {
        this.selectedFile = file;
        this.changeSelectedFile.emit(this.selectedFile);
    }

    private reloadDirectoryEntries(path: string) {
        this.setSelectedFile(null);
        this.fileSystemProvider.getEntriesOfDir(path)
            .then(entries => {
                this.directoryEntries = entries;
            })
            .catch(reason => {
                console.error(reason.message);
            });
    }
}
