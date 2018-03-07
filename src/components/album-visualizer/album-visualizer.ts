import {Component,ViewChild} from '@angular/core';
import {Picture} from "../../models/picture";
import {ServerProvider} from "../../providers/upload/server";
import {Entry} from "@ionic-native/file";
import {Slides} from "ionic-angular";

@Component({
    selector: 'album-visualizer',
    templateUrl: 'album-visualizer.html'
})
export default class AlbumVisualizerComponent{

    @ViewChild(Slides) slides: Slides;

    picturesFIFO: Picture[];

    constructor(
        public server: ServerProvider,
    ) {
        this.picturesFIFO = [];
    }


    addPicture(entry: Entry): void {
        this.findImage(entry).then(index => {
            if (index == -1) {
                this.server.uploadToServer(entry).then(picture => {
                    this.picturesFIFO.push(picture);
                }).catch(reason => {
                    console.error(reason.message);
                });
            }
        });
    }

    delPicture(): void {
        if (this.picturesFIFO.length === 0) {
            return;
        }

        const indexToRemove = this.slides.getActiveIndex();
        if (this.slides.isEnd()) {
            this.slides.slidePrev();
        }
        this.picturesFIFO.splice(indexToRemove, 1);
    }

    slideChanged() {
        //this.server.goTo(this.picturesFIFO[this.slides.getActiveIndex()]);
    }


    findImage(needle: Entry): Promise<number> {
        return new Promise(resolve => {
            let finded = false;

            for (let i = 0; i < this.picturesFIFO.length; i++) {
                if (needle.fullPath === this.picturesFIFO[i].entry.fullPath) {
                    resolve(i);
                    finded = true;
                    break;
                }
            }

            if (!finded) {
                resolve(-1);
            }
        });
    }
}