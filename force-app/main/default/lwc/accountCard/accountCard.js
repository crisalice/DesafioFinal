import {LightningElement, api} from 'lwc';

export default class AccountCard extends LightningElement {

    _account;

    @api
    get account(){
        return this._account;
    }
    set account(value){
        let imagemVar = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg';
        this._account = {id : value.Id, nome : value.Name, imagem : imagemVar};
    }

    selectAccount(){
        const accountSelected = new CustomEvent("selected", {
            detail : JSON.stringify(this._account)
        });
        this.dispatchEvent(accountSelected);
    }
}