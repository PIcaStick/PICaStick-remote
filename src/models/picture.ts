import {Entry} from "@ionic-native/file";

export class Picture {
    hash: string;

    constructor(
        public entry: Entry,
    ) {
    }

    equals(picture: Picture): boolean {
        return picture.entry.fullPath === this.entry.fullPath;
    }
}