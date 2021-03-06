import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[];
    constructor(public app: AppMainComponent) { }
    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
            {
                label: 'Gestion stock', icon: 'pi pi-fw pi-desktop', routerLink: ['/stock'],
                items: [
                    { label: 'Fiche article', icon: 'pi pi-fw pi-tablet', routerLink: ['/stock/produit-detail'] },
                    { label: 'Produits', icon: 'pi pi-fw pi-list', routerLink: ['/stock/produits'] },

                ]
            },
            {
                label: 'Grossiste', icon: 'pi pi-fw pi-briefcase', routerLink: ['/grossiste'],
                items: [
                    { label: 'Groupe', icon: 'pi pi-fw pi-bars', routerLink: ['/grossiste/groupe-fournisseurs'] },
                    { label: 'Grossiste', icon: 'pi pi-fw pi-bars', routerLink: ['/grossiste/fournisseurs'] }
                ]
            },
            {
                label: 'Tiers-payant', icon: 'pi pi-fw pi-globe', routerLink: ['/tierspayant'],
                items: [
                    { label: 'Groupes', icon: 'pi pi-fw pi-bars', routerLink: ['/tierspayant/groupe-tierspayants'] },
                    { label: 'Tiers-payants', icon: 'pi pi-fw pi-bars', routerLink: ['/tierspayant/tierspayant'] },
                    { label: 'Clients', icon: 'pi pi-fw pi-users', routerLink: ['/tierspayant/clients'] }

                ]
            },

            {
                label: 'Parametres', icon: 'pi pi-fw pi-star', routerLink: ['/parametres'],
                items: [
                    { label: 'Magasin', icon: 'pi pi-fw pi-sitemap', routerLink: ['/parametres/magasin'] },
                    { label: 'Rayons', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/parametres/rayon'] },
                    { label: 'Tva', icon: 'pi pi-fw pi-ban', routerLink: ['/parametres/tva'] },
                    { label: 'Familles ', icon: 'pi pi-fw pi-bell', routerLink: ['/parametres/famille-produits'] },
                    { label: 'Catégories', icon: 'pi pi-fw pi-apple', routerLink: ['/parametres/categorie-produits'] },
                    /*  { label: 'Type étiquettes', icon: 'pi pi-fw pi-tags', routerLink: ['/parametres/type-etiquette'] }, */
                    /*  { label: 'Type risques', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/type-risque'] }, */
                    { label: 'Remises', icon: 'pi pi-fw pi-id-card', routerLink: ['/parametres/remises'] },
                    /*     { label: 'Motifs', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/motif'] }, */
                    /*   { label: 'Modèle facture', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/models-factures'] }, */
                    /* { label: 'Type inventaires', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/type-inventaires'] }, */

                    /*   { label: 'Mode réglements', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/mode-reglements'] }, */
                    /*    { label: 'Formes', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/form-produits'] }, */
                    { label: 'Gammes', icon: 'pi pi-fw pi-clone', routerLink: ['/parametres/gamme-produits'] },
                    { label: 'Laboratoires', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/laboratoires'] },
                    /*  { label: 'Type mouvement', icon: 'pi pi-fw pi-bars', routerLink: ['/parametres/type-mvt-caisse'] }, */

                ]
            },
            {
                label: 'Admin', icon: 'pi pi-fw pi-sitemap', routerLink: ['/admin'],
                items: [
                    { label: 'Utlisateurs', icon: 'pi pi-fw pi-users', routerLink: ['/admin/user'] },
                    { label: 'Autorisations', icon: 'pi pi-fw pi-eye', routerLink: ['/admin/authority'] },
                ]
            },


            {
                label: 'UI Kit', icon: 'pi pi-fw pi-star', routerLink: ['/uikit'], badge: 15,
                items: [
                    { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                    { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
                    { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', routerLink: ['/uikit/floatlabel'] },
                    { label: 'Button', icon: 'pi pi-fw pi-mobile', routerLink: ['/uikit/button'], class: 'rotated-icon' },
                    { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
                    { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
                    { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
                    { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
                    { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
                    { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
                    { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
                    { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
                    { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
                    { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
                    { label: 'Misc', icon: 'pi pi-fw pi-circle-off', routerLink: ['/uikit/misc'] }
                ]
            },
            {
                label: 'Utilities', icon: 'pi pi-fw pi-compass', routerLink: ['utilities'],
                items: [
                    { label: 'Display', icon: 'pi pi-fw pi-desktop', routerLink: ['utilities/display'] },
                    { label: 'Elevation', icon: 'pi pi-fw pi-external-link', routerLink: ['utilities/elevation'] },
                    { label: 'FlexBox', icon: 'pi pi-fw pi-directions', routerLink: ['utilities/flexbox'] },
                    { label: 'Icons', icon: 'pi pi-fw pi-search', routerLink: ['utilities/icons'] },
                    { label: 'Text', icon: 'pi pi-fw pi-pencil', routerLink: ['utilities/text'] },
                    { label: 'Widgets', icon: 'pi pi-fw pi-star-o', routerLink: ['utilities/widgets'] },
                    { label: 'Grid System', icon: 'pi pi-fw pi-th-large', routerLink: ['utilities/grid'] },
                    { label: 'Spacing', icon: 'pi pi-fw pi-arrow-right', routerLink: ['utilities/spacing'] },
                    { label: 'Typography', icon: 'pi pi-fw pi-align-center', routerLink: ['utilities/typography'] }
                ]
            },
            {
                label: 'Pages', icon: 'pi pi-fw pi-briefcase', routerLink: ['/pages'],
                items: [
                    { label: 'Crud', icon: 'pi pi-fw pi-pencil', routerLink: ['/pages/crud'] },
                    { label: 'Calendar', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['/pages/calendar'] },
                    { label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank' },
                    { label: 'Login', icon: 'pi pi-fw pi-sign-in', routerLink: ['/login'] },
                    { label: 'Invoice', icon: 'pi pi-fw pi-dollar', routerLink: ['/pages/invoice'] },
                    { label: 'Help', icon: 'pi pi-fw pi-question-circle', routerLink: ['/pages/help'] },
                    { label: 'Error', icon: 'pi pi-fw pi-times-circle', routerLink: ['/error'] },
                    { label: 'Not Found', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/notfound'] },
                    { label: 'Access Denied', icon: 'pi pi-fw pi-lock', routerLink: ['/access'] },
                    { label: 'Empty', icon: 'pi pi-fw pi-circle-off', routerLink: ['/pages/empty'] }
                ]
            },

            {
                label: 'Documentation', icon: 'pi pi-fw pi-info-circle', routerLink: ['/documentation']
            }
        ];
    }
}
