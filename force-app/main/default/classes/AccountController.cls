public with sharing class AccountController {
    
    @AuraEnabled
    public static PageResultWrapper getAccounts(String filter, Integer pageNumber){

        Integer pageSize = 9;
        String whereClausule = '';
        Integer offset = (pageNumber-1)*pageSize;

        if(String.isNotBlank(filter)){
            whereClausule = ' WHERE Account.Name LIKE \'%'+filter+'%\' ';
        }

        PageResultWrapper result = new PageResultWrapper();
        result.tamanhoPagina = pageSize;
        result.totalItems = Database.countQuery('SELECT Count() FROM Account'  + whereClausule);
        result.allDatas = Database.query('SELECT Id, Name, PhotoUrl FROM Account ' + whereClausule + ' LIMIT :pageSize OFFSET :offset ');

        return result;
    }
}
