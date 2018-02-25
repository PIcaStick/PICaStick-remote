import {Injectable} from '@angular/core';

import {File} from "@ionic-native/file";

@Injectable()
export class FileSystemProvider {

    constructor(private file: File) {
    }

    public getFileOrDirFromPath(path: string) {
        path = this.preparePath(path);
        return this.file.listDir(
            this.getpath(path),
            this.getDirName(path)
        ).then((directoryContent) => {
            return directoryContent;
        }).catch((reason) => {
            return Promise.reject(reason);
        })
    }

    private getpath(path: string): string {
        return path.substring(0, path.lastIndexOf("/") + 1);
    }

    private getDirName(path: string): string {
        return path.substring(path.lastIndexOf("/") + 1, path.length);
    }

    private preparePath(path: string): string {
        while (path.charAt(path.length - 1) == '/') {
            path = path.substring(0, path.length - 1);
        }
        return path
    }
}
