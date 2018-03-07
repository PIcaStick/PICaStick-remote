import {Component, ViewChild} from '@angular/core';
import { Entry } from '@ionic-native/file';

@Component({
    selector: 'photos-controller',
    templateUrl: 'photos-controller.html'
})
export default class PhotosControllerComponent {
    @ViewChild('albumVisualizer') albumVisualizer;

    selectedDiskFile: Entry;

    constructor() {
        this.selectedDiskFile = null;
    }

    onChangeFile(file?: Entry) {
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