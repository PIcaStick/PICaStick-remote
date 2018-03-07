import { Picture } from "./Picture";
import { Subject } from "rxjs/Subject";

export class Album {
    pictures: Picture[];
    onPictureUpdate: Subject<Picture[]>;

    constructor() {
        this.pictures = [];
        this.onPictureUpdate = new Subject();
        this.onPictureUpdate.subscribe(pictures => {
          this.pictures = pictures;
        });
    }

    /**
     * Check if the album doesn't contains any pictures
     */
    isEmpty(): boolean {
      return !this.pictures.length;
    }

    /**
     * Determines if the album contains a picture that matches the callbackfn check
     * @param callbackfn A function that accepts up to three arguments. The containsPicture method calls the callbackfn function for each element in pictures until the callbackfn returns true, or until the end of the array.
     */
    contains(callbackfn: (value: Picture, index: number, array: Picture[]) => boolean): boolean {
      return this.pictures.some(callbackfn);
    }

    /**
     * Add a picture at the end of the album
     * @param picture Picture to add in the album
     */
    addPicture(picture: Picture) {
      const newPictures = [...this.pictures, picture];
      this.onPictureUpdate.next(newPictures);
    }

    removePicture(indexToRemove: number) {
      const newPictures = this.pictures.filter((_, index) => index !== indexToRemove);
      this.onPictureUpdate.next(newPictures);
    }
}