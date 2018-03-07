import {Component, OnInit, ViewChild} from '@angular/core';
import {Picture} from "../../models/picture";
import {ServerProvider} from "../../providers/upload/server";
import {Entry} from "@ionic-native/file";
import {Events, Slides} from "ionic-angular";

@Component({
    selector: 'album-visualizer',
    templateUrl: 'album-visualizer.html'
})
export default class AlbumVisualizerComponent implements OnInit {
    ngOnInit(): void {
        this.events.subscribe('picture:add:found', this.addPicture);
        this.events.subscribe("picture:del:found", this.delPicture);
    }

    @ViewChild(Slides) slides: Slides;

    picturesFIFO: Picture[];

    constructor(public server: ServerProvider,
                private events: Events) {
        this.picturesFIFO = [];

    }

    addPicture(entry: Entry): void {
        this.server.uploadToServer(entry).then(picture => {
            this.picturesFIFO.push(picture);
        }).catch(reason => {
            console.error(reason);
        });
    }

    delPicture(entry: Entry): void {
        console.log("del picture");
    }

    slideChanged() {
        console.log(this.slides.getActiveIndex());
        //this.server.goTo(this.picturesFIFO[this.slides.getActiveIndex()]);
    }


}