import {Entry} from "@ionic-native/file";

export class Picture {
    entry: Entry;
    hash: string;

    constructor(entry: Entry) {
        this.entry = entry;
    }
}