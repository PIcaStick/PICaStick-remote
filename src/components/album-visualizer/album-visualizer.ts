import {Component, ViewChild} from '@angular/core';
import {Picture} from "../../models/picture";
import {ServerProvider} from "../../providers/upload/server";
import {Entry} from "@ionic-native/file";
import {Slides} from "ionic-angular";

@Component({
    selector: 'album-visualizer',
    templateUrl: 'album-visualizer.html'
})
export default class AlbumVisualizerComponent{
    @ViewChild('slides') slides: Slides;

    album: Picture[];

    constructor(
        public server: ServerProvider,
    ) {
        this.album = [];
    }


    addPicture(entry: Entry): void {
        if (this.isInAlbum(entry)) {
            return;
        }

        this.server.uploadToServer(entry).then(picture => {
            this.album.push(picture);
        }).catch(reason => {
            console.error(reason.message);
        });
    }

    delPicture(): void {
        if (this.album.length === 0) {
            return;
        }

        const indexToRemove = this.slides.getActiveIndex();
        if (this.slides.isEnd()) {
            this.slides.slidePrev();
        }
        this.album.splice(indexToRemove, 1);
    }

    isInAlbum(needle: Entry): boolean {
        for (let i = 0; i < this.album.length; i++) {
            if (needle.fullPath === this.album[i].entry.fullPath) {
                return true;
            }
        }

         return false;
    }
}