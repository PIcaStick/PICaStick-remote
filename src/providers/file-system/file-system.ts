import {Injectable} from '@angular/core';

import {File} from "@ionic-native/file";

@Injectable()
export class FileSystemProvider {

    constructor(private file: File) {
    }

    public getFileOrDirFromPath(path: string) {
        return this.file.listDir(
            path.substring(0, path.lastIndexOf("/")+1),
            path.substring(path.lastIndexOf("/") + 1, path.length)
        ).then((directoryContent) => {
            return directoryContent;
        }).catch((reason) => {
            return Promise.reject(reason);
        })
    }

}
