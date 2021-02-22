import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { PanelsDemoComponent } from './demo/view/panelsdemo.component';
import { OverlaysDemoComponent } from './demo/view/overlaysdemo.component';
import { MediaDemoComponent } from './demo/view/mediademo.component';
import { MenusDemoComponent } from './demo/view/menusdemo.component';
import { MessagesDemoComponent } from './demo/view/messagesdemo.component';
import { MiscDemoComponent } from './demo/view/miscdemo.component';
import { EmptyDemoComponent } from './demo/view/emptydemo.component';
import { ChartsDemoComponent } from './demo/view/chartsdemo.component';
import { FileDemoComponent } from './demo/view/filedemo.component';
import { DocumentationComponent } from './demo/view/documentation.component';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { ButtonDemoComponent } from './demo/view/buttondemo.component';
import { TableDemoComponent } from './demo/view/tabledemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { TreeDemoComponent } from './demo/view/treedemo.component';
import { DisplayComponent } from './utilities/display.component';
import { ElevationComponent } from './utilities/elevation.component';
import { FlexboxComponent } from './utilities/flexbox.component';
import { GridComponent } from './utilities/grid.component';
import { IconsComponent } from './utilities/icons.component';
import { WidgetsComponent } from './utilities/widgets.component';
import { SpacingComponent } from './utilities/spacing.component';
import { TypographyComponent } from './utilities/typography.component';
import { TextComponent } from './utilities/text.component';
import { AppCrudComponent } from './pages/app.crud.component';
import { AppCalendarComponent } from './pages/app.calendar.component';
import { AppInvoiceComponent } from './pages/app.invoice.component';
import { AppHelpComponent } from './pages/app.help.component';
import { TvaComponent } from './entities/tva/tva.component';
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
import { ClientComponent } from './entities/client/client.component';
import { FournisseurComponent } from './entities/fournisseur/fournisseur.component';
import { GroupeTierspayantComponent } from './entities/groupe-tierspayant/groupe-tierspayant.component';
import { TiersPayantComponent } from './entities/tiers-payant/tiers-payant.component';
import { GroupeFournisseurComponent } from './entities/groupe-fournisseur/groupe-fournisseur.component';
import { GammeProduitComponent } from './entities/gamme-produit/gamme-produit.component';
import { LaboratoireProduitComponent } from './entities/laboratoire-produit/laboratoire-produit.component';
import { FormeProduitComponent } from './entities/forme-produit/forme-produit.component';
import { DetailComponent } from './entities/detail/detail.component';
import { ProductComponent } from './entities/product/product.component';
import { MagasinComponent } from './entities/magasin/magasin.component';
import { RayonComponent } from './entities/rayon/rayon.component';
import { UserComponent } from './entities/user/user.component';
import { RoleComponent } from './entities/role/role.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    { path: '', component: DashboardDemoComponent },
                    { path: 'uikit/formlayout', component: FormLayoutDemoComponent },
                    { path: 'uikit/input', component: InputDemoComponent },
                    { path: 'uikit/floatlabel', component: FloatLabelDemoComponent },
                    { path: 'uikit/button', component: ButtonDemoComponent },
                    { path: 'uikit/table', component: TableDemoComponent },
                    { path: 'uikit/list', component: ListDemoComponent },
                    { path: 'uikit/tree', component: TreeDemoComponent },
                    { path: 'uikit/panel', component: PanelsDemoComponent },
                    { path: 'uikit/overlay', component: OverlaysDemoComponent },
                    { path: 'uikit/menu', component: MenusDemoComponent },
                    { path: 'uikit/media', component: MediaDemoComponent },
                    { path: 'uikit/message', component: MessagesDemoComponent },
                    { path: 'uikit/misc', component: MiscDemoComponent },
                    { path: 'uikit/charts', component: ChartsDemoComponent },
                    { path: 'uikit/file', component: FileDemoComponent },
                    { path: 'utilities/display', component: DisplayComponent },
                    { path: 'utilities/elevation', component: ElevationComponent },
                    { path: 'utilities/flexbox', component: FlexboxComponent },
                    { path: 'utilities/grid', component: GridComponent },
                    { path: 'utilities/icons', component: IconsComponent },
                    { path: 'utilities/widgets', component: WidgetsComponent },
                    { path: 'utilities/spacing', component: SpacingComponent },
                    { path: 'utilities/typography', component: TypographyComponent },
                    { path: 'utilities/text', component: TextComponent },
                    { path: 'pages/crud', component: AppCrudComponent },
                    { path: 'pages/calendar', component: AppCalendarComponent },
                    { path: 'pages/invoice', component: AppInvoiceComponent },
                    { path: 'pages/help', component: AppHelpComponent },
                    { path: 'pages/empty', component: EmptyDemoComponent },
                    { path: 'documentation', component: DocumentationComponent },
                    { path: 'parametres/tva', component: TvaComponent },
                    { path: 'parametres/type-risque', component: TypeRisqueComponent },
                    { path: 'parametres/type-mvt-caisse', component: TypeMvtCaisseComponent },
                    { path: 'parametres/remises', component: RemiseComponent },
                    { path: 'parametres/motif', component: MotifComponent },
                    { path: 'parametres/models-factures', component: ModelFactureComponent },
                    { path: 'parametres/type-inventaires', component: TypeInventaireComponent },
                    { path: 'parametres/type-etiquette', component: TypeEtiquetteComponent },
                    { path: 'parametres/mode-reglements', component: ModePaiementComponent },
                    { path: 'parametres/categorie-produits', component: CategorieProduitComponent },
                    { path: 'parametres/famille-produits', component: FamilleProduitComponent },
                    { path: 'parametres/form-produits', component: FormeProduitComponent },
                    { path: 'parametres/laboratoires', component: LaboratoireProduitComponent },
                    { path: 'parametres/gamme-produits', component: GammeProduitComponent },
                    { path: 'grossiste/groupe-fournisseurs', component: GroupeFournisseurComponent },
                    { path: 'grossiste/fournisseurs', component: FournisseurComponent },
                    { path: 'tierspayant/groupe-tierspayants', component: GroupeTierspayantComponent },
                    { path: 'tierspayant/tierspayant', component: TiersPayantComponent },
                    { path: 'tierspayant/clients', component: ClientComponent },
                    { path: 'stock/produit-detail', component: DetailComponent },
                    { path: 'stock/produits', component: ProductComponent },
                    { path: 'parametres/magasin', component: MagasinComponent },
                    { path: 'parametres/rayon', component: RayonComponent },
                    { path: 'admin/authority', component: RoleComponent },
                    { path: 'admin/user', component: UserComponent },




                ]
            },
            { path: 'error', component: AppErrorComponent },
            { path: 'access', component: AppAccessdeniedComponent },
            { path: 'notfound', component: AppNotfoundComponent },
            { path: 'login', component: AppLoginComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
