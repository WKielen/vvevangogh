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
};


