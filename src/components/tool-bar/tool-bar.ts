import {Component, Output, EventEmitter} from '@angular/core';
import {Events} from 'ionic-angular';

@Component({
    selector: 'tool-bar',
    templateUrl: 'tool-bar.html'
})
export default class ToolBarComponent {
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
        this.clickArrowUp.emit();
    }
}