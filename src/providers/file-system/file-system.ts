import {Injectable} from '@angular/core';

import {DirectoryEntry, Entry, File} from "@ionic-native/file";

@Injectable()
export class FileSystemProvider {

    constructor(private file: File) {
    }

    /**
     * Get the entries (file and directories) of a directory
     * @param path Directory path
     */
    public getEntriesOfDir(path: string): Promise<Entry[]> {
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

    /**
     * Remove the n end trailing slashes
     * @param path
     */
    private cleanPath(path: string): string {
        return path.replace(/(.+?)\/*?$/, '$1');
    }

    private getDirName(cleanPath: string): string {
        return cleanPath.split('/').pop();
    }

    private getParentPath(cleanPath: string) {
        const tmpPath = cleanPath.substring(0, cleanPath.lastIndexOf("/"));
        return tmpPath === '' ? '/' : tmpPath;
    }

    private getUrlFromPath(cleanPath: string) {
        return `file://${cleanPath}`;
    }
}
