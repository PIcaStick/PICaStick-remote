import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tool-bar',
    templateUrl: 'tool-bar.html',
})
export default class ToolBarComponent {
    @Output() clickArrowDown: EventEmitter<any>;
    @Output() clickArrowUp: EventEmitter<any>;

    arrowDownDisabled: boolean;
    arrowUpDisabled: boolean;

    constructor() {
        this.clickArrowDown = new EventEmitter();
        this.clickArrowUp = new EventEmitter();

        this.arrowDownDisabled = false;
        this.arrowUpDisabled = false;
    }

    arrowDown(): void {
        this.clickArrowDown.emit();
    }

    arrowUp(): void {
        this.clickArrowUp.emit();
    }

    disableArrowDown(shouldBeDisable: boolean): void {
        this.arrowDownDisabled = shouldBeDisable;
    }

    disableArrowUp(shouldBeDisable: boolean): void {
        this.arrowUpDisabled = shouldBeDisable;
    }
}