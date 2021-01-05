import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { AccordionModule } from 'primeng/accordion';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ChartModule } from 'primeng/chart';
import { CheckboxModule } from 'primeng/checkbox';
import { ChipsModule } from 'primeng/chips';
import { CodeHighlighterModule } from 'primeng/codehighlighter';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DataViewModule } from 'primeng/dataview';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { GalleriaModule } from 'primeng/galleria';
import { InplaceModule } from 'primeng/inplace';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { LightboxModule } from 'primeng/lightbox';
import { ListboxModule } from 'primeng/listbox';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MultiSelectModule } from 'primeng/multiselect';
import { OrderListModule } from 'primeng/orderlist';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { PanelMenuModule } from 'primeng/panelmenu';
import { PasswordModule } from 'primeng/password';
import { PickListModule } from 'primeng/picklist';
import { ProgressBarModule } from 'primeng/progressbar';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SidebarModule } from 'primeng/sidebar';
import { SlideMenuModule } from 'primeng/slidemenu';
import { SliderModule } from 'primeng/slider';
import { SplitButtonModule } from 'primeng/splitbutton';
import { StepsModule } from 'primeng/steps';
import { TabMenuModule } from 'primeng/tabmenu';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TerminalModule } from 'primeng/terminal';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToastModule } from 'primeng/toast';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { TreeModule } from 'primeng/tree';
import { TreeTableModule } from 'primeng/treetable';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DynamicDialogModule } from 'primeng/dynamicdialog';



// Application Components
import { AppCodeModule } from './app.code.component';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { AppConfigComponent } from './app.config.component';
import { AppMenuComponent } from './app.menu.component';
import { AppMenuitemComponent } from './app.menuitem.component';
import { AppBreadcrumbComponent } from './app.breadcrumb.component';
import { AppRightPanelComponent } from './app.rightpanel.component';
import { AppTopBarComponent } from './app.topbar.component';
import { AppFooterComponent } from './app.footer.component';

// Demo pages
import { DashboardDemoComponent } from './demo/view/dashboarddemo.component';
import { FormLayoutDemoComponent } from './demo/view/formlayoutdemo.component';
import { InputDemoComponent } from './demo/view/inputdemo.component';
import { FloatLabelDemoComponent } from './demo/view/floatlabeldemo.component';
import { ButtonDemoComponent } from './demo/view/buttondemo.component';
import { TableDemoComponent } from './demo/view/tabledemo.component';
import { ListDemoComponent } from './demo/view/listdemo.component';
import { TreeDemoComponent } from './demo/view/treedemo.component';
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
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { AppLoginComponent } from './pages/app.login.component';

// Demo services
import { CountryService } from './demo/service/countryservice';
import { CustomerService } from './demo/service/customerservice';
import { EventService } from './demo/service/eventservice';
import { IconService } from './demo/service/iconservice';
import { NodeService } from './demo/service/nodeservice';
import { PhotoService } from './demo/service/photoservice';
import { ProductService } from './demo/service/productservice';

// Application services
import { BreadcrumbService } from './app.breadcrumb.service';
import { MenuService } from './app.menu.service';


import { ConfirmationService } from 'primeng/api';
import { TvaComponent } from './entities/tva/tva.component';
import { TvaService } from './entities/tva/tva.service';
import { TypeRisqueComponent } from './entities/type-risque/type-risque.component';
import { TypeRisqueService } from './entities/type-risque/type-risque.service';
import { MotifComponent } from './entities/motif/motif.component';
import { RemiseComponent } from './entities/remise/remise.component';
import { TypeInventaireComponent } from './entities/type-inventaire/type-inventaire.component';
import { TypeMvtCaisseComponent } from './entities/type-mvt-caisse/type-mvt-caisse.component';
import { TypeEtiquetteComponent } from './entities/type-etiquette/type-etiquette.component';
import { ModePaiementComponent } from './entities/mode-paiement/mode-paiement.component';
import { ModelFactureComponent } from './entities/model-facture/model-facture.component';
import { TypeMvtCaisseService } from './entities/type-mvt-caisse/type-mvt-caisse.service';
import { MotifService } from './entities/motif/motif.service';
import { ModelFactureService } from './entities/model-facture/model-facture.service';
import { TypeInventaireService } from './entities/type-inventaire/type-inventaire.service';
import { TypeEtiquetteService } from './entities/type-etiquette/type-etiquette.service';
import { ModePaiementService } from './entities/mode-paiement/mode-paiement.service';
import { RisqueComponent } from './entities/risque/risque.component';
import { FormeProduitComponent } from './entities/forme-produit/forme-produit.component';
import { GammeProduitComponent } from './entities/gamme-produit/gamme-produit.component';
import { LaboratoireProduitComponent } from './entities/laboratoire-produit/laboratoire-produit.component';
import { CodegestioneProduitComponent } from './entities/codegestione-produit/codegestione-produit.component';
import { GroupeFournisseurComponent } from './entities/groupe-fournisseur/groupe-fournisseur.component';
import { FournisseurComponent } from './entities/fournisseur/fournisseur.component';
import { MagasinComponent } from './entities/magasin/magasin.component';
import { FamilleProduitComponent } from './entities/famille-produit/famille-produit.component';
import { CategorieProduitComponent } from './entities/categorie-produit/categorie-produit.component';
import { FamilleProduitService } from './entities/famille-produit/famille-produit.service';
import { CategorieProduitService } from './entities/categorie-produit/categorie-produit.service';
import { FormeProduitService } from './entities/forme-produit/forme-produit.service';
import { LaboratoireProduitService } from './entities/laboratoire-produit/laboratoire-produit.service';
import { GroupeFournisseurService } from './entities/groupe-fournisseur/groupe-fournisseur.service';
import { FournisseurService } from './entities/fournisseur/fournisseur.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { ClientComponent } from './entities/client/client.component';
import { AyantDroitComponent } from './entities/ayant-droit/ayant-droit.component';
import { TiersPayantComponent } from './entities/tiers-payant/tiers-payant.component';
import { GroupeTierspayantComponent } from './entities/groupe-tierspayant/groupe-tierspayant.component';
import { GroupeTierspayantService } from './entities/groupe-tierspayant/groupe-tierspayant.service';
import { TiersPayantService } from './entities/tiers-payant/tiers-payant.service';
import { FocusDirective } from './focus.directive';
import { TiersPayantFormComponent } from './shared/form/tiers-payant-form/tiers-payant-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientFormComponent } from './entities/client/client-form/client-form.component';
import { CompagnieComponent } from './entities/compagnie/compagnie.component';
import { AyantDroitService } from './entities/ayant-droit/ayant-droit.service';
import { CompteClientService } from './entities/client/compte-client.service';
import { CompteClientFormComponent } from './entities/client/client-form/compte-client-form/compte-client-form.component';
import { AyantDroitFormComponent } from './entities/ayant-droit/ayant-droit-form/ayant-droit-form.component';
import { ProductComponent } from './entities/product/product.component';
import { DetailComponent } from './entities/detail/detail.component';
import { DetailService } from './entities/detail/detail.service';
import { ProduitService } from './entities/product/produit.service';
import { StockProduitFormComponent } from './entities/detail/stock-produit-form/stock-produit-form.component';
import { FournisseurProduitFormComponent } from './entities/detail/fournisseur-produit-form/fournisseur-produit-form.component';
import { RayonComponent } from './entities/rayon/rayon.component';
import { MagasinService } from './entities/magasin/magasin.service';
import { StockProduitService } from './entities/detail/stock-produit-form/stock-produit.service';
import { RayonService } from './entities/rayon/rayon.service';
import { FournisseurProduitService } from './entities/detail/fournisseur-produit-form/fournisseur-produit.service';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        AccordionModule,
        AutoCompleteModule,
        BreadcrumbModule,
        ButtonModule,
        CalendarModule,
        CardModule,
        CarouselModule,
        ChartModule,
        CheckboxModule,
        ChipsModule,
        CodeHighlighterModule,
        ConfirmDialogModule,
        ColorPickerModule,
        ContextMenuModule,
        DataViewModule,
        DialogModule,
        DropdownModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
        InputNumberModule,
        InputMaskModule,
        InputSwitchModule,
        InputTextModule,
        InputTextareaModule,
        LightboxModule,
        ListboxModule,
        MegaMenuModule,
        MenuModule,
        MenubarModule,
        MessageModule,
        MessagesModule,
        MultiSelectModule,
        OrderListModule,
        OrganizationChartModule,
        OverlayPanelModule,
        PaginatorModule,
        PanelModule,
        PanelMenuModule,
        PasswordModule,
        PickListModule,
        ProgressBarModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        ScrollPanelModule,
        SelectButtonModule,
        SidebarModule,
        SlideMenuModule,
        SliderModule,
        SplitButtonModule,
        StepsModule,
        TableModule,
        TabMenuModule,
        TabViewModule,
        TerminalModule,
        TieredMenuModule,
        ToastModule,
        ToggleButtonModule,
        ToolbarModule,
        TooltipModule,
        TreeModule,
        TreeTableModule,
        VirtualScrollerModule,
        NgxSpinnerModule,
        NgbModule,
        AppCodeModule,
        KeyFilterModule,
        DynamicDialogModule,
    ],
    declarations: [
        AppComponent,
        AppMainComponent,
        AppConfigComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppBreadcrumbComponent,
        DashboardDemoComponent,
        DashboardDemoComponent,
        FormLayoutDemoComponent,
        InputDemoComponent,
        FloatLabelDemoComponent,
        ButtonDemoComponent,
        TableDemoComponent,
        ListDemoComponent,
        TreeDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MediaDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
        DisplayComponent,
        ElevationComponent,
        FlexboxComponent,
        GridComponent,
        IconsComponent,
        WidgetsComponent,
        SpacingComponent,
        TypographyComponent,
        TextComponent,
        AppCrudComponent,
        AppCalendarComponent,
        AppLoginComponent,
        AppInvoiceComponent,
        AppHelpComponent,
        AppNotfoundComponent,
        AppErrorComponent,
        AppAccessdeniedComponent,
        TvaComponent,
        TypeRisqueComponent,
        MotifComponent,
        RemiseComponent,
        TypeInventaireComponent,
        TypeMvtCaisseComponent,
        TypeEtiquetteComponent,
        ModePaiementComponent,
        ModelFactureComponent,
        RisqueComponent,
        FormeProduitComponent,
        GammeProduitComponent,
        LaboratoireProduitComponent,
        CodegestioneProduitComponent,
        GroupeFournisseurComponent,
        FournisseurComponent,
        MagasinComponent,
        FamilleProduitComponent,
        CategorieProduitComponent,
        ClientComponent,
        AyantDroitComponent,
        TiersPayantComponent,
        GroupeTierspayantComponent,
        FocusDirective,
        TiersPayantFormComponent,
        ClientFormComponent,
        CompagnieComponent,
        CompteClientFormComponent,
        AyantDroitFormComponent,
        ProductComponent,
        DetailComponent,
        StockProduitFormComponent,
        FournisseurProduitFormComponent,
        RayonComponent
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, BreadcrumbService, MenuService,
        TvaService,
        ConfirmationService,
        TypeRisqueService,
        TypeMvtCaisseService,
        MotifService,
        ModelFactureService,
        TypeInventaireService,
        TypeEtiquetteService,
        ModePaiementService,
        FamilleProduitService,
        CategorieProduitService,
        FormeProduitService,
        LaboratoireProduitService,
        GroupeFournisseurService,
        FournisseurService,
        GroupeTierspayantService,
        TiersPayantService,
        AyantDroitService,
        CompteClientService,
        DetailService,
        ProduitService,
        MagasinService,
        StockProduitService,
        RayonService,
        FournisseurProduitService
    ],

    entryComponents: [
        TiersPayantFormComponent,
        ClientFormComponent,
        CompteClientFormComponent,
        AyantDroitFormComponent,
        StockProduitFormComponent,
        FournisseurProduitFormComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
