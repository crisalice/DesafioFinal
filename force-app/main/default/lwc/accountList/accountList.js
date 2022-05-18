import {LightningElement, wire} from 'lwc';
import {fireEvent, registerListener} from 'c/pubSub';
import {CurrentPageReference} from 'lightning/navigation';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

export default class AccountList extends LightningElement {
   
    @wire(CurrentPageReference) pageRef;
    filterName = null;
    accounts = [];
    page = 1;

    connectedCallback(){
        registerListener('filterChange', this.getFilter, this);
        this.getAccountsJS();
    }

    getFilter(filterParam){
        this.filterName = filterParam;
        this.getAccountsJS();
    }

    getAccountsJS(){
        getAccounts({filter : this.filterName, pageNumber : this.page}).then( (response) => {
            this.accounts = response;
            console.log('this.accounts: ', this.accounts);
        }).catch( (error) => {
            console.log('ERRO AO BUSCAR CONTA ',error);
        });
    }

    handlePreviousPage(){
        this.page = this.page -1;
        this.getAccountsJS();
    }

    handleNextPage(){
        this.page = this.page + 1;
        this.getAccountsJS();
    }

    handleAccountSelected(event){     
        console.log('Capturou o evento do componente filho', event.detail);   
        fireEvent(this.pageRef, 'selectedAccount', event.detail);  
    }
}