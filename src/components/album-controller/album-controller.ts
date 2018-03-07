import { Component, ViewChild } from '@angular/core';
import { Entry } from '@ionic-native/file';
import { Picture } from '../../models/Picture';
import { Album } from '../../models/Album';

@Component({
    selector: 'album-controller',
    templateUrl: 'album-controller.html',
})
export default class AlbumControllerComponent {
    @ViewChild('albumVisualizer') albumVisualizer;

    selectedDiskFile: Entry;
    album: Album;

    constructor() {
        this.selectedDiskFile = null;
        this.album = new Album();
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
        this.albumVisualizer.removeCurrentPicture();
    }
}