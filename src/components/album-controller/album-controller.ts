import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Entry } from '@ionic-native/file';
import { Picture } from '../../models/Picture';
import AlbumVisualizerComponent from '../album-visualizer/album-visualizer';
import ToolBarComponent from '../tool-bar/tool-bar';
import { Album } from '../../models/Album';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'album-controller',
    templateUrl: 'album-controller.html',
})
export default class AlbumControllerComponent implements OnInit, OnDestroy {
    @ViewChild('albumVisualizer') albumVisualizer: AlbumVisualizerComponent;
    @ViewChild('toolBar') toolBar: ToolBarComponent;

    selectedDiskFile: Entry;
    album: Album;
    subscriptions: Subscription[];

    constructor() {
        this.selectedDiskFile = null;
        this.album = new Album();
    }

    ngOnInit() {
        const pictureUpdateSub = this.album.onPictureUpdate.subscribe(() => {
            this.updateRemovePictureAction();
        });


        this.subscriptions = [
            pictureUpdateSub,
        ];

        this.updateRemovePictureAction();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
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

    updateRemovePictureAction() {
        const cannotRemovePicture = this.album.isEmpty();
        this.toolBar.disableArrowUp(cannotRemovePicture);
    }
}