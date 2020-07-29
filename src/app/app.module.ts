import {NgModule} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';

// PrimeNG Components for demos
import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipsModule} from 'primeng/chips';
import {CodeHighlighterModule} from 'primeng/codehighlighter';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
import {FullCalendarModule} from 'primeng/fullcalendar';
import {GalleriaModule} from 'primeng/galleria';
import {InplaceModule} from 'primeng/inplace';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {LightboxModule} from 'primeng/lightbox';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {SplitButtonModule} from 'primeng/splitbutton';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

// Application Components
import {AppComponent} from './app.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {AppRightPanelComponent} from './app.rightpanel.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';

// Demo pages
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';

// Demo services
import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {ConfirmationService} from 'primeng/api';
// Application services
import {BreadcrumbService} from './breadcrumb.service';
import {MenuService} from './app.menu.service';
import {TvaComponent} from './entities/tva/tva.component';
import {TvaService} from './entities/tva/tva.service';
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


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutes,
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
        EditorModule,
        FieldsetModule,
        FileUploadModule,
        FullCalendarModule,
        GalleriaModule,
        InplaceModule,
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
        ScrollPanelModule,
        SelectButtonModule,
        SlideMenuModule,
        SliderModule,
        SpinnerModule,
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
        NgxSpinnerModule

    ],
    declarations: [
        AppComponent,
        AppMenuComponent,
        AppMenuitemComponent,
        AppTopBarComponent,
        AppFooterComponent,
        AppRightPanelComponent,
        AppBreadcrumbComponent,
        DashboardDemoComponent,
        SampleDemoComponent,
        FormsDemoComponent,
        DataDemoComponent,
        PanelsDemoComponent,
        OverlaysDemoComponent,
        MenusDemoComponent,
        MessagesDemoComponent,
        MessagesDemoComponent,
        MiscDemoComponent,
        ChartsDemoComponent,
        EmptyDemoComponent,
        FileDemoComponent,
        DocumentationComponent,
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
        GroupeTierspayantComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        CarService, CountryService,
        EventService,
        NodeService,
        ConfirmationService,
        BreadcrumbService,
        MenuService,
        TvaService,
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
        TiersPayantService
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
