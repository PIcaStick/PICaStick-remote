import {Injectable} from '@angular/core';

import {DirectoryEntry, Entry, ErrorCallback, File, FileSystem, Metadata, MetadataCallback} from "@ionic-native/file";

@Injectable()
export class FileSystemProvider {

    constructor(private file: File) {
    }

    public getFileOrDirFromPath(path: string) {
        path = this.preparePath(path);

        return this.file.resolveDirectoryUrl(path)
            .then(current => {
                return new Promise((resolve, reject) => {
                    current.getParent(resolve, reject);
                });
            })
            .then(parent => {
                return this.file.listDir(
                    this.getpath(path),
                    this.getDirName(path)
                ).then(directoryContent => {
                    directoryContent = this.addPreviousDir(directoryContent, parent);
                    return directoryContent;
                });
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
}
