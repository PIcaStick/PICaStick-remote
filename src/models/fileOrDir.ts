export class FileOrDir {
    name: string;
    isFile: boolean;
    path: string;
    nativeURL: string;

    constructor(fileOrDir: any) {
        this.name = fileOrDir.name;
        this.isFile = fileOrDir.isFile;
        this.path = fileOrDir.fullPath;
        this.nativeURL = fileOrDir.nativeURL;
    }
}