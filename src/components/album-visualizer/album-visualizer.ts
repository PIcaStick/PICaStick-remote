import {Component, ViewChild} from '@angular/core';
import {Picture} from "../../models/picture";
import {Entry} from "@ionic-native/file";
import {Slides} from "ionic-angular";
import { Album } from '../../models/Album';

@Component({
    selector: 'album-visualizer',
    templateUrl: 'album-visualizer.html'
})
export default class AlbumVisualizerComponent{
    @ViewChild('slides') slides: Slides;

    album: Album;

    constructor() {
        this.album = new Album();
    }

    addPicture(entry: Entry): void {
        const isInAlbum = this.album.contains(picture => picture.entry.fullPath === entry.fullPath);
        if (isInAlbum) {
            return;
        }

        const picture = new Picture(entry);
        this.album.addPicture(picture);
    }

    delPicture(): void {
        if (this.album.isEmpty()) {
            return;
        }

        const indexToRemove = this.slides.getActiveIndex();
        if (this.slides.isEnd()) {
            this.slides.slidePrev();
        }
        this.album.pictures = this.album.pictures.filter((_, index) => index !== indexToRemove);
    }
}