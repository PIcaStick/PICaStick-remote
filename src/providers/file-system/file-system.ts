import {Injectable} from '@angular/core';

import {DirectoryEntry, Entry, File} from "@ionic-native/file";

@Injectable()
export class FileSystemProvider {

    constructor(private file: File) {
    }

    public getFileOrDirFromPath(path: string) {
        const url = `file://${path}`;
        const prepararedPath = this.preparePath(url);

        const parentPath = this.getParent(prepararedPath);

        return this.file.resolveDirectoryUrl(parentPath)
            .then(parent => {
                const path = this.getpath(prepararedPath);
                const dirName = this.getDirName(prepararedPath);
                const dirListPromise = this.file.listDir(path, dirName);
                return Promise.all([dirListPromise, parent]);
            })
            .then(([directoryContent, parent]) => {
                const modifiedContent = this.addPreviousDir(directoryContent, parent);
                return modifiedContent;
            });
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

    private addPreviousDir(directoryContent: Entry[], parent: DirectoryEntry): Entry[] {
        directoryContent.unshift(parent);
        return directoryContent;
    }

    private getParent(path: string) {
        const tmpPath = path.substring(0, path.lastIndexOf("/"));
        if (tmpPath === "file://") {
            return "file:///";
        } else {
            return tmpPath;
        }
    }
}
