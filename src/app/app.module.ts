import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {File} from '@ionic-native/file';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {AboutPage} from "../pages/about/about";
import {IdentificationPage} from "../pages/identification/identification";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {DiskFilePickerComponent} from "../components/disk-file-picker/disk-file-picker";
import {FileSystemProvider} from '../providers/file-system/file-system';

import AlbumControllerComponent from '../components/album-controller/album-controller';
import AlbumVisualizerComponent from '../components/album-visualizer/album-visualizer';
import ToolBarComponent from '../components/tool-bar/tool-bar';
import {ServerProvider} from '../providers/upload/server';
import {HttpClientModule} from "@angular/common/http";

import TokenDefinitionComponent from '../components/token-definition/token-definition';
import { TokenIdentificationPrivider } from '../providers/token-identification/token-identification';
import { Base64 } from '@ionic-native/base64';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        IdentificationPage,
        DiskFilePickerComponent,
        AlbumControllerComponent,
        AlbumVisualizerComponent,
        ToolBarComponent,
        TokenDefinitionComponent,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AboutPage,
        IdentificationPage,
        DiskFilePickerComponent,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        File,
        FileSystemProvider,
        ServerProvider,
        TokenIdentificationPrivider,
        Base64,
        FileTransfer,
    ]
})
export class AppModule {
}
