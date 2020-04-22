export const ROLES = {
    BESTUUR: 'BS',
    BEWONER: 'BW',
    BEHEER: 'BH',
    ADMIN: 'AD',
    JC: 'JC',
    TRAINER: 'TR',
    LEDENADMIN: 'LA',
    PENNINGMEESTER: 'PM',
    TEST: 'TE',

};

export const PAGEROLES = {
    homePageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.BEHEER, ROLES.BEWONER],
    bewonersPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.BEHEER],
    gebruikersPageRoles: [ROLES.ADMIN, ROLES.BESTUUR],
    downloadPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.BEHEER],
    dashboardPageRoute: [ROLES.TEST],
    ledenPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC, ROLES.TRAINER],
    ledenmanagerPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.LEDENADMIN],
    mailPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC],
    agendaPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC],
    websitePageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.JC],
    multiupdatePageRoles: [ROLES.ADMIN, ROLES.PENNINGMEESTER, ROLES.LEDENADMIN],
    oudledenPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.LEDENADMIN],
    contrbedragenPageRoles: [ROLES.ADMIN, ROLES.PENNINGMEESTER],
    usersPageRoles: [ROLES.ADMIN, ROLES.BESTUUR],
    ladderPageRoles: [ROLES.ADMIN, ROLES.JC],
    syncnttbPageRoles: [ROLES.ADMIN, ROLES.LEDENADMIN],
    testPageRoles: [ROLES.TEST],
    trainingdeelnamePageRoles: [ROLES.TRAINER, ROLES.ADMIN, ROLES.BESTUUR,],
};

export const ROUTE = {
    homePageRoute: 'home',
    bewonersPageRoute: 'bewoners',
    gebruikersPageRoute: 'gebruikers',
    downloadPageRoute: 'download',
    offlinePageRoute: 'offline',
    dashboardPageRoute: 'dashboard',
    ledenPageRoute: 'leden',
    ledenmanagerPageRoute: 'ledenmanager',
    mailPageRoute: 'mail',
    agendaPageRoute: 'agenda',
    websitePageRoute: 'website',
    multiupdatePageRoute: 'multiupdate',
    oudledenPageRoute: 'oudleden',
    contrbedragenPageRoute: 'contrbedragen',
    usersPageRoute: 'users',
    ladderPageRoute: 'ladder',
    syncnttbPageRoute: 'syncnttb',
    testPageRoute: 'test',
    trainingdeelnamePageRoute: 'trainingdeelname',
    trainingoverzichtPageRoute: 'trainingoverzicht',
};

//anotherfile.ts that refers to global constants
/*
import { GlobalVariable } from './path/global';

export class HeroService {
    private baseApiUrl = GlobalVariable.BASE_API_URL;

    //... more code
}
*/
