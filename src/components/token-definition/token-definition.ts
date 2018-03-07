import {Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { TokenIdentificationPrivider } from '../../providers/token-identification/token-identification';

@Component({
    selector: 'token-definition',
    templateUrl: 'token-definition.html'
})
export default class TokenDefinitionComponent {


    constructor(
        private tokenIdenfication: TokenIdentificationPrivider,
    ) {
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const { token } = form.value;
        this.tokenIdenfication.setToken(token);
        form.reset();
    }
}