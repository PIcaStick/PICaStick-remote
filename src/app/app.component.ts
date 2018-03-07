import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import {AboutPage} from "../pages/about/about";
import {IdentificationPage} from "../pages/identification/identification";

import MenuPage from "../models/MenuPage";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    pages: MenuPage[];

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private menu: MenuController) {

        this.pages = [{
            name: 'Home',
            component: HomePage,
        },
        {
            name: 'Identification',
            component: IdentificationPage,
        },
        {
            name: 'About',
            component: AboutPage,
        }];
    
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    goToPage(page: MenuPage) {
        this.nav.setRoot(page.component);
        this.menu.close();
    }
}
