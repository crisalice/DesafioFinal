public class PageResultWrapper {
   
    @AuraEnabled
    public integer tamanhoPagina {get; set;}
    
    @AuraEnabled
    public integer totalItems {get;set;}

    @AuraEnabled
    public object[] allDatas {get;set;}
}
