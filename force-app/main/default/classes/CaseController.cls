public with sharing class CaseController {

    @AuraEnabled
    public static Case createCase(String accountId, String subject, String description){        
        
        Case newCase = new Case();
        newCase.AccountId = accountId;
        newCase.Subject = subject;
        newCase.Description = description;
        newCase.OriginApp__c = true;
        insert newCase;
        
        return newCase;
    }
}
