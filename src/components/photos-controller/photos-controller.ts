import {Component} from '@angular/core';
import { Entry } from '@ionic-native/file';

@Component({
    selector: 'photos-controller',
    templateUrl: 'photos-controller.html'
})
export default class PhotosControllerComponent {

    selectedDiskFile: Entry;

    constructor() {
        this.selectedDiskFile = null;
    }

    onChangeFile(file: Entry) {
        this.selectedDiskFile = file;
    }

    onClickArrowDown() {
        console.log('click down');
        console.log(this.selectedDiskFile);
    }

    onClickArrowUp() {
        console.log('click up');
    }
}