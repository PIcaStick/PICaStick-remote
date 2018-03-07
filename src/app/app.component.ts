import {Component, ViewChild} from '@angular/core';
import {MenuController, Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from "../pages/home/home";
import {AboutPage} from "../pages/about/about";
import {IdentificationPage} from "../pages/identification/identification";

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = HomePage;

    constructor(platform: Platform,
                statusBar: StatusBar,
                splashScreen: SplashScreen,
                private menu: MenuController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    about() {
        this.nav.setRoot(AboutPage);
        this.menu.close();
    }

    home() {
        this.nav.setRoot(HomePage);
        this.menu.close();
    }

    identification() {
        this.nav.setRoot(IdentificationPage);
        this.menu.close();
    }
}
