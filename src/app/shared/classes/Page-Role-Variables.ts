export const ROLES = {
    BESTUUR: 'BS',
    BEWONER: 'BW',
    BEHEER: 'BH',
    ADMIN: 'AD',
};

export const PAGEROLES = {
    homePageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.BEHEER, ROLES.BEWONER],
    bewonersPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.BEHEER],
    downloadPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.BEHEER],
    onderhoudPageRoles: [ROLES.ADMIN, ROLES.BESTUUR],
    gebruikersPageRoles: [ROLES.ADMIN, ROLES.BESTUUR],
    documentPageRoles: [ROLES.ADMIN, ROLES.BESTUUR, ROLES.BEHEER, ROLES.BEWONER],
    onderhoudDocsPageRoles: [ROLES.ADMIN, ROLES.BESTUUR],

    dashboardPageRoute: [ROLES.ADMIN],
    ledenPageRoles: [ROLES.ADMIN],
    ledenmanagerPageRoles: [ROLES.ADMIN],
    mailPageRoles: [ROLES.ADMIN],
    agendaPageRoles: [ROLES.ADMIN],
    websitePageRoles: [ROLES.ADMIN],
    multiupdatePageRoles: [ROLES.ADMIN],
    oudledenPageRoles: [ROLES.ADMIN],
    contrbedragenPageRoles: [ROLES.ADMIN],
    usersPageRoles: [ROLES.ADMIN, ROLES.BESTUUR],
    ladderPageRoles: [ROLES.ADMIN],
    syncnttbPageRoles: [ROLES.ADMIN],
    testPageRoles: [ROLES.ADMIN],
    trainingdeelnamePageRoles: [ROLES.ADMIN],
};

export const ROUTE = {
    homePageRoute: 'home',
    bewonersPageRoute: 'bewoners',
    downloadPageRoute: 'download',
    onderhoudPageRoute: 'onderhoud',
    gebruikersPageRoute: 'gebruikers',
    documentPageRoute: 'documenten',
    documentOnderhoudPageRoute: 'onderhouddocs',

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


