import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FileSystemeProvider {

  constructor(public http: HttpClient) {
  }

}
