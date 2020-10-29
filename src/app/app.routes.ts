import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { SampleDemoComponent } from './demo/view/sampledemo.component';
import { FormsDemoComponent } from './demo/view/formsdemo.component';
import { DataDemoComponent } from './demo/view/datademo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import {TvaComponent} from './entities/tva/tva.component';
import { TypeRisqueComponent } from './entities/type-risque/type-risque.component';
import { TypeMvtCaisseComponent } from './entities/type-mvt-caisse/type-mvt-caisse.component';
import { RemiseComponent } from './entities/remise/remise.component';
import { MotifComponent } from './entities/motif/motif.component';
import { ModelFactureComponent } from './entities/model-facture/model-facture.component';
import { TypeInventaireComponent } from './entities/type-inventaire/type-inventaire.component';
import { TypeEtiquetteComponent } from './entities/type-etiquette/type-etiquette.component';
import { ModePaiementComponent } from './entities/mode-paiement/mode-paiement.component';
import { CategorieProduitComponent } from './entities/categorie-produit/categorie-produit.component';
import { FamilleProduitComponent } from './entities/famille-produit/famille-produit.component';
import { FormeProduitComponent } from './entities/forme-produit/forme-produit.component';
import { LaboratoireProduitComponent } from './entities/laboratoire-produit/laboratoire-produit.component';
import { GammeProduitComponent } from './entities/gamme-produit/gamme-produit.component';
import { GroupeFournisseurComponent } from './entities/groupe-fournisseur/groupe-fournisseur.component';
import { FournisseurComponent } from './entities/fournisseur/fournisseur.component';
import { GroupeTierspayantComponent } from './entities/groupe-tierspayant/groupe-tierspayant.component';
import { TiersPayantComponent } from './entities/tiers-payant/tiers-payant.component';
import { ClientComponent } from './entities/client/client.component';

export const routes: Routes = [
    { path: '', component: DashboardDemoComponent },
    { path: 'components/sample', component: SampleDemoComponent },
    { path: 'components/forms', component: FormsDemoComponent },
    { path: 'components/data', component: DataDemoComponent },
    { path: 'components/panels', component: PanelsDemoComponent },
    { path: 'components/overlays', component: OverlaysDemoComponent },
    { path: 'components/menus', component: MenusDemoComponent },
    { path: 'components/messages', component: MessagesDemoComponent },
    { path: 'components/misc', component: MiscDemoComponent },
    { path: 'pages/empty', component: EmptyDemoComponent },
    { path: 'components/charts', component: ChartsDemoComponent },
    { path: 'components/file', component: FileDemoComponent },
    { path: 'documentation', component: DocumentationComponent },
    { path: 'parametres/tva', component: TvaComponent },
    { path: 'parametres/type-risque', component: TypeRisqueComponent },
    { path: 'parametres/type-mvt-caisse', component: TypeMvtCaisseComponent },
    { path: 'parametres/remises', component: RemiseComponent },
    { path: 'parametres/motif', component: MotifComponent },
    { path: 'parametres/models-factures', component: ModelFactureComponent },
    { path: 'parametres/type-inventaires', component: TypeInventaireComponent }    ,
    { path: 'parametres/type-etiquette', component: TypeEtiquetteComponent }  ,
    { path: 'parametres/mode-reglements', component: ModePaiementComponent }  ,
    { path: 'parametres/categorie-produits', component: CategorieProduitComponent }  ,
    { path: 'parametres/famille-produits', component: FamilleProduitComponent }  ,
    { path: 'parametres/form-produits', component: FormeProduitComponent }  ,
    { path: 'parametres/laboratoires', component: LaboratoireProduitComponent }  ,
    { path: 'parametres/gamme-produits', component: GammeProduitComponent }  ,
    { path: 'grossiste/groupe-fournisseurs', component: GroupeFournisseurComponent }  ,
    { path: 'grossiste/fournisseurs', component: FournisseurComponent }  ,
    { path: 'tierspayant/groupe-tierspayants', component: GroupeTierspayantComponent }  ,
    { path: 'tierspayant/tierspayant', component: TiersPayantComponent }  ,
    { path: 'tierspayant/clients', component: ClientComponent }  ,
    
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'});
