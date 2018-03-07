import {Component, ViewChild} from '@angular/core';
import {Picture} from "../../models/picture";
import {Entry} from "@ionic-native/file";
import {Slides} from "ionic-angular";

@Component({
    selector: 'album-visualizer',
    templateUrl: 'album-visualizer.html'
})
export default class AlbumVisualizerComponent{
    @ViewChild('slides') slides: Slides;

    album: Picture[];

    constructor() {
        this.album = [];
    }


    addPicture(entry: Entry): void {
        const isInAlbum = this.album.some(picture => picture.entry.fullPath === entry.fullPath);
        if (isInAlbum) {
            return;
        }

        const picture = new Picture(entry);
        this.album.push(picture);
    }

    delPicture(): void {
        const albumIsEmpty = this.album.length === 0;
        if (albumIsEmpty) {
            return;
        }

        const indexToRemove = this.slides.getActiveIndex();
        if (this.slides.isEnd()) {
            this.slides.slidePrev();
        }
        this.album.splice(indexToRemove, 1);
    }
}