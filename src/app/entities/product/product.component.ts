import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService, SelectItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IFournisseurProduit } from 'src/app/model/fournisseur-produit.model';
import { IProduit } from 'src/app/model/produit.model';
import { IProduitCriteria, ProduitCriteria } from 'src/app/model/produit-criteria.model';
import { IStockProduit } from 'src/app/model/stock-produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { DetailService } from '../detail/detail.service';
import { FournisseurProduitFormComponent } from '../detail/fournisseur-produit-form/fournisseur-produit-form.component';
import { StockProduitFormComponent } from '../detail/stock-produit-form/stock-produit-form.component';
import { FamilleProduitService } from '../famille-produit/famille-produit.service';
import { FormeProduitService } from '../forme-produit/forme-produit.service';
import { FournisseurService } from '../fournisseur/fournisseur.service';
import { GammeProduitService } from '../gamme-produit/gamme-produit.service';
import { LaboratoireProduitService } from '../laboratoire-produit/laboratoire-produit.service';
import { RayonService } from '../rayon/rayon.service';
import { ProduitFormComponent } from './produit-form/produit-form.component';
import { Status } from 'src/app/model/enumerations/status.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class ProductComponent implements OnInit {
  entites?: IProduit[];
  selectedCriteria: number = 0;
  selectedRayon: number;
  selectedFamille: number = 0;
  filtesProduits: SelectItem[] = [];
  rayons: SelectItem[] = [];
  familles: SelectItem[] = [];
  //eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  loading: boolean;
  isSaving = false;
  selectedEl: IProduit;
  displayDialog: boolean;
  fileDialog: boolean;
  responseDialog: boolean;
  responsedto!: IResponseDto;
  splitbuttons: MenuItem[];
  ref: DynamicDialogRef;
  criteria: IProduitCriteria;
  constructor(
    protected entityService: DetailService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    protected rayonService: RayonService,
    protected laboratoireService: LaboratoireProduitService,
    protected formeProduitService: FormeProduitService,
    protected fournisseurService: FournisseurService,
    protected familleService: FamilleProduitService,
    protected gammeProduitService: GammeProduitService,
  ) {

  }
  ngOnInit(): void {
    this.criteria = new ProduitCriteria();
    this.criteria.status = Status.ACTIVE;
    this.filtesProduits = [
      { label: 'Produits actifs', value: 0 },
      { label: 'Produits désactifs', value: 1 },
      { label: 'Déconditionnables', value: 2 },
      { label: 'Déconditionnés', value: 3 },
      { label: 'Tous', value: 10 }

    ];
    this.loadPage();
    this.populate();
    this.splitbuttons = [
      {
        label: 'CSV', icon: 'pi pi-folder', command: () => {
          this.showFileDialog();
        }
      },
      {
        label: 'JSON', icon: 'pi pi-file', command: () => {

        }
      },
    ];

  }
  async populate() {
    let familleProduitsResponse = await this.familleService.queryPromise({ search: '' });
    familleProduitsResponse.forEach(e => {
      this.familles.push({ label: e.libelle, value: e.id });
    });
    let rayonsResponse = await this.rayonService.queryPromise({ search: '' });
    rayonsResponse.forEach(e => {
      this.rayons.push({ label: e.libelle, value: e.id });
    });
  }
  protected onSuccess(data: IProduit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['stock/produits'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage

      },
    });
    this.entites = data || [];
    console.log(this.entites);
    this.loading = false;
  }
  protected onError(): void {
    this.loading = false;
  }

  loadPage(page?: number, search?: String): void {
    const pageToLoad: number = page || this.page;
    const query: String = search || '';
    this.loading = true;
    this.entityService
      .queryDetails({
        page: pageToLoad,
        size: ITEMS_PER_PAGE,
        /*   size: this.itemsPerPage, */
        search: search,
        laboratoireId: this.criteria.laboratoireId,
        tvaId: this.criteria.tvaId,
        magasinId: this.criteria.magasinId,
        rayonId: this.criteria.rayonId,
        deconditionne: this.criteria.deconditionne,
        deconditionnable: this.criteria.deconditionnable,
        remiseId: this.criteria.remiseId,
        status: this.criteria.status,
        familleId: this.criteria.familleId
      })
      .subscribe(
        (res: HttpResponse<IProduit[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
  lazyLoading(event: LazyLoadEvent): void {
    this.page = event.first / event.rows;
    this.loading = true;
    this.entityService
      .queryDetails({
        page: this.page,

        size: ITEMS_PER_PAGE,
        /*   size: this.itemsPerPage, */
        search: '',
        laboratoireId: this.criteria.laboratoireId,
        tvaId: this.criteria.tvaId,
        magasinId: this.criteria.magasinId,
        rayonId: this.criteria.rayonId,
        deconditionne: this.criteria.deconditionne,
        remiseId: this.criteria.remiseId,
        status: this.criteria.status
      })
      .subscribe(
        (res: HttpResponse<IProduit[]>) => this.onSuccess(res.body, res.headers, this.page),
        () => this.onError()
      );
  }
  confirmDialog(id: number) {
    this.modalService.confirm({
      message: 'Voulez-vous supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entityService.delete(id).subscribe(() => {
          console.log('delete client ');
          this.selectedEl = null;

        },
          (e: HttpResponse<any>) => {

            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
          }

        );
      }
    });
  }
  delete(produit: IProduit): void {
    this.confirmDelete(produit.id);
  }

  editProduitFour(four: IFournisseurProduit): void {
    this.ref = this.dialogService.open(FournisseurProduitFormComponent, {
      data: { produit: this.selectedEl, fournisseurProduit: four },
      width: '50%',
      header: "Modification du code fournisseur " + four.codeCip + " " + four.fournisseurLibelle
    });
    this.ref.onClose.subscribe((entity: IFournisseurProduit) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(produit => { this.selectedEl = produit; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });


  }
  addProduitFour(): void {
    this.ref = this.dialogService.open(FournisseurProduitFormComponent, {
      data: { produit: this.selectedEl, fournisseurProduit: null },
      width: '50%',
      header: "Ajout d'un nouveau fournisseur à l'article " + this.selectedEl.codeCip + " " + this.selectedEl.libelle
    });
    this.ref.onClose.subscribe((entity: IFournisseurProduit) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(produit => { this.selectedEl = produit; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }
  addStock(): void {
    this.ref = this.dialogService.open(StockProduitFormComponent, {
      data: { produit: this.selectedEl, stockProduit: null },
      width: '50%',
      header: "Gestion du stock de l'article " + this.selectedEl.codeCip + " " + this.selectedEl.libelle
    });
    this.ref.onClose.subscribe((entity: IStockProduit) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(produit => { this.selectedEl = produit; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }


  confirmDelete(id: number): void {
    this.confirmDialog(id);
  }

  showFileDialog(): void {
    this.fileDialog = true;
  }
  onUpload(event) {
    const formData: FormData = new FormData();
    const file = event.files[0];
    formData.append('importcsv', file, file.name);
    this.uploadFileResponse(this.entityService.uploadFile(formData));
  }

  protected uploadFileResponse(result: Observable<HttpResponse<IResponseDto>>): void {
    result.subscribe(
      (res: HttpResponse<IResponseDto>) => this.onPocesCsvSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onPocesCsvSuccess(responseDto: IResponseDto | null): void {
    this.responsedto = responseDto;
    this.responseDialog = true;
    this.fileDialog = false;
    this.loadPage(0);
  }

  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.displayDialog = false;
    this.fileDialog = false;
  }


  onSelect(event: any): void {
    this.selectedEl = event;
  }
  loadClient(event: LazyLoadEvent): void {
    this.page = event.first / event.rows;
    this.loading = true;
    this.entityService
      .query({
        page: this.page,
        size: event.rows,
        tierspayantId: this.selectedEl.id
      })
      .subscribe(
        (res: HttpResponse<IProduit[]>) => this.onClientSuccess(res.body, res.headers, this.page),
        () => this.onError()
      );
  }

  protected onClientSuccess(data: IProduit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['stock/produits'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage

      },
    });

    this.loading = false;
  }

  onEdit(produit: IProduit): void {
    this.ref = this.dialogService.open(ProduitFormComponent, {
      data: { produit: produit },
      width: '70%',
      height: 'auto',
      header: "Modification du produit " + produit.codeCip + " " + produit.libelle
    });
    this.ref.onClose.subscribe((entity: IProduit) => {
      if (entity) {
        this.selectedEl = entity;
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Modification effectuée avec succes' });
      }
    });



  }
  addNewEntity(): void {
    this.ref = this.dialogService.open(ProduitFormComponent, {
      data: { produit: null },
      width: '70%',
      height: 'auto',
      header: 'Ajouter un nouveau produit'
    });
    this.ref.onClose.subscribe((entity: IProduit) => {
      if (entity) {
        this.selectedEl = entity;
        this.loadPage();
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'produit ajouté avec success' });
      }
    });
  }

  filtreClik(event: any): void {

    if (this.selectedCriteria == 2) {
      this.criteria.deconditionnable = true;
      this.criteria.deconditionne = undefined;
      this.criteria.status = Status.ACTIVE;
    } else if (this.selectedCriteria == 3) {

      this.criteria.deconditionnable = undefined;
      this.criteria.deconditionne = true;
      this.criteria.status = Status.ACTIVE;

    } else if (this.selectedCriteria == 1) {
      this.criteria.status = Status.DESACTIVE;
      this.criteria.deconditionnable = undefined;
      this.criteria.deconditionne = undefined;
    } else if (this.selectedCriteria == 0) {
      this.criteria.status = Status.ACTIVE;
      this.criteria.deconditionnable = undefined;
      this.criteria.deconditionne = undefined;
    } else if (this.selectedCriteria == 10) {
      this.criteria = {};
    }
    this.loadPage(0);
  }

  search(event: any): void {
    this.loadPage(0, event.target.value);
  }

  filtreRayon(event: any): void {
    this.criteria.rayonId = this.selectedRayon;
    this.loadPage(0);
  }
  filtreFamilleProduit(event: any): void {
    this.criteria.familleId = this.selectedFamille;
    this.loadPage(0);
  }
  editStock(stock: IStockProduit): void { }
  removeStock(stock: IStockProduit): void { }
  removeProduitFour(four: IFournisseurProduit): void { }

  addDetails(): void {
    this.ref = this.dialogService.open(FournisseurProduitFormComponent, {
      data: { produit: this.selectedEl, fournisseurProduit: null },
      width: '50%',
      header: "Ajout d'un nouveau fournisseur à l'article " + this.selectedEl.codeCip + " " + this.selectedEl.libelle
    });
    this.ref.onClose.subscribe((entity: IFournisseurProduit) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(produit => { this.selectedEl = produit; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }
  deconditionProduit(detail: IProduit): void {

  }
}
