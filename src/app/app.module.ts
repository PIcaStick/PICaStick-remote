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

import {DirContentComponent} from "../components/dir-content/dir-content";
import {FileSystemProvider} from '../providers/file-system/file-system';

import PhotosControllerComponent from '../components/photos-controller/photos-controller';
import AlbumVisualizerComponent from '../components/album-visualizer/album-visualizer';
import ActionBarComponent from '../components/action-bar/action-bar';
import {ServerProvider} from '../providers/upload/server';
import {HttpClientModule} from "@angular/common/http";

import TokenDefinitionComponent from '../components/token-definition/token-definition';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        IdentificationPage,
        DirContentComponent,
        PhotosControllerComponent,
        AlbumVisualizerComponent,
        ActionBarComponent,
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
