import { Component } from '@angular/core';

/**
 * Generated class for the DirContentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'dir-content',
  templateUrl: 'dir-content.html'
})
export class DirContentComponent {

  text: string;

  constructor() {
    console.log('Hello DirContentComponent Component');
    this.text = 'Hello World';
  }

}
