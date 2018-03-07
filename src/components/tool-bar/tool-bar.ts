import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tool-bar',
    templateUrl: 'tool-bar.html',
})
export default class ToolBarComponent {
    @Output() clickArrowDown: EventEmitter<any>;
    @Output() clickArrowUp: EventEmitter<any>;

    constructor() {
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