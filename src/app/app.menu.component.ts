import { Component, OnInit } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public app: AppComponent) { }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'fa fa-fw fa-home', routerLink: ['/']},
            {
                label: 'Grossiste', icon: 'fa fa-fw fa-paint-brush', routerLink: ['/grossiste'],
                items: [
                    { label: 'Groupe grossiste', icon: 'fa fa-fw fa-bars', routerLink: ['/grossiste/groupe-fournisseurs']  },
                    { label: 'Grossiste', icon: 'fa fa-fw fa-bars', routerLink: ['/grossiste/fournisseurs']  }
                ]
            },
            {
                label: 'Tiers-payant', icon: 'fa fa-fw fa-paint-brush', routerLink: ['/tierspayant'],
                items: [
                    
                    { label: 'Tiers-payant', icon: 'fa fa-fw fa-bars', routerLink: ['/tierspayant/tierspayant']  },
                    { label: 'Groupe', icon: 'fa fa-fw fa-bars', routerLink: ['/tierspayant/groupe-tierspayants']  }

                ]
            },
            
            {
                label: 'Parametres', icon: 'fa fa-fw fa-cube', routerLink: ['/parametres'],
                items: [
                    { label: 'Tva', icon: 'fa fa-fw fa-columns', routerLink: ['/parametres/tva']  },
                    { label: 'Type risques', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/type-risque']  },
                    { label: 'Remises', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/remises']  },
                    { label: 'Motifs', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/motif']  },
                    { label: 'modeles-factures', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/models-factures']  },
                    { label: 'Type inventaires', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/type-inventaires']  },
                    { label: 'Type étiquettes', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/type-etiquette']  },
                    { label: 'Mode réglements', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/mode-reglements']  },
                    { label: 'Famille article', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/famille-produits']  },
                    { label: 'Catégorie article', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/categorie-produits']  },
                    { label: 'Forme article', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/form-produits']  },
                    { label: 'Gamme produit', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/gamme-produits']  },
                    { label: 'Laboratoires', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/laboratoires']  },
                    { label: 'Type mouvement de caisse', icon: 'fa fa-fw fa-bars', routerLink: ['/parametres/type-mvt-caisse']  },
                    
                ]
            },
            {
                label: 'Menu Colors', icon: 'fa fa-fw fa-paint-brush',
                items: [
                    { label: 'Light', icon: 'fa fa-fw fa-paint-brush', command: event => this.app.lightMenu = true },
                    { label: 'Dark', icon: 'fa fa-fw fa-paint-brush', command: event => this.app.lightMenu = false }
                ]
            },
            {
                label: 'Layouts', icon: 'fa fa-fw fa-cog',
                items: [
                    { label: 'Static', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'static' },
                    { label: 'Overlay', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'overlay' },
                    { label: 'Slim', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'slim' },
                    { label: 'Horizontal', icon: 'fa fa-fw fa-bars', command: event => this.app.menuMode = 'horizontal' }
                ]
            },
            {
                label: 'Themes', icon: 'fa fa-fw fa-paint-brush', badge: 15,
                items: [
                    {
                        label: 'Pink', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('pink', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('pink', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Indigo', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('indigo', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('indigo', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Green', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('green', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('green', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Amber', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('amber', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('amber', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Deep Purple', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeppurple', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeppurple', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Blue', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('blue', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('blue', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Dark Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('darkblue', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('darkblue', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Cyan', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('cyan', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('cyan', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Purple', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('purple', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('purple', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Deep Orange', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeporange', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('deeporange', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Lime', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('lime', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('lime', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Yellow', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('yellow', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('yellow', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('bluegrey', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('bluegrey', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Mojito', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('mojito', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('mojito', 'dark')
                            }
                        ]
                    },
                    {
                        label: 'Grey', icon: 'fa fa-fw fa-paint-brush',
                        items: [
                            {
                                label: 'Light', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('grey', 'light')
                            },
                            {
                                label: 'Dark', icon: 'fa fa-fw fa-paint-brush',
                                command: (event) => this.changeTheme('grey', 'dark')
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Components', icon: 'fa fa-fw fa-bars', routerLink: ['/components'],
                items: [
                    { label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/components/sample']  },
                    { label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/components/forms'] },
                    { label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/components/data'] },
                    { label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/components/panels'] },
                    { label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/components/overlays'] },
                    { label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/components/menus'] },
                    { label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/components/messages'] },
                    { label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/components/charts'] },
                    { label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/components/file'] },
                    { label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/components/misc'] }
                ]
            }
         
        ];
    }

    changeTheme(theme: string, scheme: string) {
        const layoutLink: HTMLLinkElement = document.getElementById('layout-css') as HTMLLinkElement;
        const layoutHref = 'assets/layout/css/layout-' + theme + '.css';

        this.replaceLink(layoutLink, layoutHref);

        const themeLink: HTMLLinkElement = document.getElementById('theme-css') as HTMLLinkElement;
        const themeHref = 'assets/theme/' + theme + '/theme-' + scheme + '.css';

        this.replaceLink(themeLink, themeHref);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        } else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    onMenuClick(event) {
        this.app.onMenuClick(event);
    }
}
