import {Component, Output, EventEmitter} from '@angular/core';
import {Events} from 'ionic-angular';

@Component({
    selector: 'action-bar',
    templateUrl: 'action-bar.html'
})
export default class ActionBarComponent {
    @Output() clickArrowDown: EventEmitter<any>;
    @Output() clickArrowUp: EventEmitter<any>;

    constructor(
        public events: Events,
    ) {
        this.clickArrowDown = new EventEmitter();
        this.clickArrowUp = new EventEmitter();
    }

    arrowDown(): void {
        this.clickArrowDown.emit();
    }

    arrowUp(): void {
        this.events.publish("picture:delete");
        this.clickArrowUp.emit();
    }
}