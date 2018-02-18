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
import {FileSystemeProvider} from '../providers/file-systeme/file-systeme';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        AboutPage,
        DirContentComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        AboutPage,
        DirContentComponent
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        File,
        FileSystemeProvider
    ]
})
export class AppModule {
}
