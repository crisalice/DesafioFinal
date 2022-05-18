import {LightningElement, wire, api} from 'lwc';
import {registerListener} from 'c/pubSub';
import {CurrentPageReference, NavigationMixin} from 'lightning/navigation';
import createCase from '@salesforce/apex/CaseController.createCase';

export default class Case2Detail extends NavigationMixin(LightningElement) {
 
    @wire(CurrentPageReference) pageRef;
    accountName = 'SELECIONE O CLIENTE';
    showButton = false;
    accountId;
    subject;
    dateOccurrence;
    description;
   
    connectedCallback(){
        registerListener('selectedAccount', this.handleAccountSelected, this);
    }

    handleAccountSelected(accountParam){
        let accountSelected = JSON.parse(accountParam);
        this.accountName = accountSelected.nome;
        this.accountId = accountSelected.id;
    }

    handleSubject(event){
        this.subject = event.currentTarget.value;
        this.showSaveButton();
    }
  
    handleDateOccurrence(event){
        this.dateOccurrence = event.currentTarget.value;
        this.showSaveButton();
    }
  
    handleDescription(event){
        this.description = event.currentTarget.value;
        this.showSaveButton();
    }

    showSaveButton(){
        this.showButton = (this.accountId && this.subject && this.dateOccurrence && this.description);
    }
    
    submitCase(){   
        createCase({accountId : this.accountId, subject : this.subject, description : this.description}).then( (response) => {
           
            this[NavigationMixin.Navigate]({
                type : 'standard__recordPage',
                attributes : {
                    recordId : response.Id,
                    actionName : 'view'
                }
            });

        } ).catch( (error) => {
            console.log('erro ao criar caso', error);
        } );
    }
}