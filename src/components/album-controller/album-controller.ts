import {Component, ViewChild} from '@angular/core';
import { Entry } from '@ionic-native/file';
import { Picture } from '../../models/picture';

@Component({
    selector: 'album-controller',
    templateUrl: 'album-controller.html'
})
export default class AlbumControllerComponent {
    @ViewChild('albumVisualizer') albumVisualizer;

    selectedDiskFile: Entry;

    constructor() {
        this.selectedDiskFile = null;
    }

    onChangeSelectedDiskFile(file?: Entry) {
        this.selectedDiskFile = file;
    }

    onClickArrowDown() {
        if (this.selectedDiskFile) {
            const newPicture = new Picture(this.selectedDiskFile);
            this.albumVisualizer.addPicture(newPicture);
        }
    }

    onClickArrowUp() {
        this.albumVisualizer.delPicture();
    }
}