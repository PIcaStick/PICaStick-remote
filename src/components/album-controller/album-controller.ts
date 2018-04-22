import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Entry } from '@ionic-native/file';
import { Picture } from '../../models/Picture';
import AlbumVisualizerComponent from '../album-visualizer/album-visualizer';
import ToolBarComponent from '../tool-bar/tool-bar';
import { Album } from '../../models/Album';
import { Subscription } from 'rxjs/Subscription';
import { ServerProvider } from '../../providers/upload/server';

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

    constructor(
        private server: ServerProvider,
    ) {
        this.selectedDiskFile = null;
        this.album = new Album();
    }

    ngOnInit() {
        const pictureUpdateSub = this.album.onPictureUpdate.subscribe(() => {
            this.updateRemovePictureAction();
            this.updateAddPictureAction();
        });

        this.subscriptions = [
            pictureUpdateSub,
        ];

        this.updateAddPictureAction();
        this.updateRemovePictureAction();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
    }

    onChangeSelectedDiskFile(file?: Entry) {
        this.selectedDiskFile = file;
        this.updateAddPictureAction();
    }

    onClickArrowDown() {
        if (this.selectedDiskFile) {
            const newPicture = new Picture(this.selectedDiskFile);
            this.albumVisualizer.addPicture(newPicture);
            this.onImageVizualizerChange(newPicture);
        }
    }

    onClickArrowUp() {
        this.albumVisualizer.removeCurrentPicture();
    }

    updateAddPictureAction() {
        const ifCannotAddPicture = this.selectedDiskFile
            ? this.album.contains(picture => picture.entry.fullPath === this.selectedDiskFile.fullPath)
            : true;

        this.toolBar.disableArrowDown(ifCannotAddPicture);
    }

    updateRemovePictureAction() {
        const ifCannotRemovePicture = this.album.isEmpty();
        this.toolBar.disableArrowUp(ifCannotRemovePicture);
    }

    onImageVizualizerChange(image: Picture): void {
        this.server.uploadToServer(image.entry)
            .then(hash => {
                // TODO: image.hash = hash;
            })
            .catch(error => {
                // TODO : notif error
            });
    }
}