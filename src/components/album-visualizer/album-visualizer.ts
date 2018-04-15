import { Component, ViewChild, Input } from '@angular/core';
import { Picture } from "../../models/Picture";
import { Slides } from "ionic-angular";
import { Album } from '../../models/Album';

@Component({
    selector: 'album-visualizer',
    templateUrl: 'album-visualizer.html',
})
export default class AlbumVisualizerComponent{
    @ViewChild('slides') slides: Slides;

    @Input() album: Album;

    constructor() {
    }

    addPicture(newPicture: Picture): void {
        const isInAlbum = this.album.contains(picture => picture.equals(newPicture));
        if (isInAlbum) {
            return;
        }

        this.album.addPicture(newPicture);
    }

    removeCurrentPicture(): void {
        if (this.album.isEmpty()) {
            return;
        }

        const indexToRemove = this.slides.getActiveIndex();
        if (this.slides.isEnd()) {
            this.slides.slidePrev();
        }
        this.album.removePicture(indexToRemove);
    }
}