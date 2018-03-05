import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {File} from '@ionic-native/file';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {HomePage} from '../pages/home/home';
import {AboutPage} from "../pages/about/about";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {DirContentComponent} from "../components/dir-content/dir-content";
import {FileSystemProvider} from '../providers/file-system/file-system';

import PhotosControllerComponent from '../components/photos-controller/photos-controller';
import AlbumVisualizerComponent from '../components/album-visualizer/album-visualizer';
import ActionBarComponent from '../components/action-bar/action-bar';
import {ServerProvider} from '../providers/upload/server';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        DirContentComponent,
        PhotosControllerComponent,
        AlbumVisualizerComponent,
        ActionBarComponent,
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
        DirContentComponent,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        File,
        FileSystemProvider,
        ServerProvider
    ]
})
export class AppModule {
}
