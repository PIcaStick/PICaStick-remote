import {Injectable} from '@angular/core';

import {DirectoryEntry, Entry, File} from "@ionic-native/file";

@Injectable()
export class FileSystemProvider {

    constructor(private file: File) {
    }

    public getFileOrDirFromPath(path: string) {
        const cleanPath = this.preparePath(path);
        const url = this.getUrlFromPath(cleanPath);

        const parentPath = this.getParentPath(cleanPath);
        const parentUrl = this.getUrlFromPath(parentPath);

        return this.file.resolveDirectoryUrl(parentUrl)
            .then(parent => {
                const path = this.getPath(url);
                const dirName = this.getDirName(cleanPath);
                const dirListPromise = this.file.listDir(path, dirName);
                return Promise.all([dirListPromise, parent]);
            })
            .then(([directoryContent, parent]) => {
                const modifiedContent = this.addPreviousDir(directoryContent, parent);
                return modifiedContent;
            });
    }


    private getPath(path: string): string {
        return path.substring(0, path.lastIndexOf("/") + 1);
    }

    private getDirName(path: string): string {
        return path.substring(path.lastIndexOf("/") + 1, path.length);
    }

    private preparePath(path: string): string {
        while (path.charAt(path.length - 1) == '/') {
            path = path.substring(0, path.length - 1);
        }
        return path === '' ? '/' : path;
    }

    private addPreviousDir(directoryContent: Entry[], parent: DirectoryEntry): Entry[] {
        directoryContent.unshift(parent);
        return directoryContent;
    }

    private getParentPath(path: string) {
        const tmpPath = path.substring(0, path.lastIndexOf("/"));
        return tmpPath === '' ? '/' : tmpPath;
    }

    private getUrlFromPath(path: string) {
        return `file://${path}`;
    }
}
