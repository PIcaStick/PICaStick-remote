import {Component, ViewChild} from '@angular/core';
import { Entry } from '@ionic-native/file';

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
            this.albumVisualizer.addPicture(this.selectedDiskFile);
        }
    }

    onClickArrowUp() {
        this.albumVisualizer.delPicture();
    }
}