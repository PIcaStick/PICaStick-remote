import {Component, ViewChild} from '@angular/core';
import {Picture} from "../../models/picture";
import {ServerProvider} from "../../providers/upload/server";
import {Entry} from "@ionic-native/file";
import {Slides} from "ionic-angular";

@Component({
    selector: 'album-visualizer',
    templateUrl: 'album-visualizer.html'
})
export default class AlbumVisualizerComponent {

    @ViewChild(Slides) slides: Slides;

    picturesFIFO: Picture[];

    constructor(public server: ServerProvider) {
        this.picturesFIFO = [];
    }

    addPicture(entry: Entry): void {
        this.server.uploadToServer(entry).then(entry => {
            this.picturesFIFO.push(entry);
        }).catch(reason => {
            console.error(reason);
        });
    }

    slideChanged() {
        console.log(this.slides.getActiveIndex());
        //this.server.goTo(this.picturesFIFO[this.slides.getActiveIndex()]);
    }


}