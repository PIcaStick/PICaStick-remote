import {Injectable} from '@angular/core';

import {DirectoryEntry, Entry, File} from "@ionic-native/file";

@Injectable()
export class FileSystemProvider {

    constructor(private file: File) {
    }

    public getFileOrDirFromPath(path: string) {
        const cleanPath = this.cleanPath(path);
        const url = this.getUrlFromPath(cleanPath);

        const parentPath = this.getParentPath(cleanPath);
        const parentUrl = this.getUrlFromPath(parentPath);

        return this.file.resolveDirectoryUrl(parentUrl)
            .then(parent => {
                const dirName = this.getDirName(cleanPath);
                const dirListPromise = this.file.listDir(parentUrl, dirName);
                return Promise.all([dirListPromise, parent]);
            })
            .then(([directoryContent, parent]) => {
                directoryContent.unshift(parent);
                return directoryContent;
            });
    }

    private getDirName(path: string): string {
        return path.split('/').pop();
    }

    /**
     * Remove the n end trailing slashes
     * @param path 
     */
    private cleanPath(path: string): string {
        return path.replace(/(.+?)\/*?$/, '$1');
    }

    private getParentPath(path: string) {
        const tmpPath = path.substring(0, path.lastIndexOf("/"));
        return tmpPath === '' ? '/' : tmpPath;
    }

    private getUrlFromPath(path: string) {
        return `file://${path}`;
    }
}
