import {Injectable} from '@angular/core';

@Injectable()
export class TokenIdentificationPrivider {

    private token: string;

    constructor() {
      this.token = null;
    }
    
    setToken(token: string) {
      this.token = token;
    }

    getToken(): string {
      return this.token;
    }
}
