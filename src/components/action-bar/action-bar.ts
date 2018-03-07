import {Component} from '@angular/core';
import {Events} from 'ionic-angular';

@Component({
    selector: 'action-bar',
    templateUrl: 'action-bar.html'
})
export default class ActionBarComponent {

    constructor(public events: Events) {
    }

    addPicture(): void {
        this.events.publish('picture:add');
    }

    delPicture(): void {
        this.events.publish("picture:delete");
    }
}