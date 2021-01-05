import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IFournisseurProduit } from 'src/app/model/fournisseur-produit.model';
import { IProduit } from 'src/app/model/produit.model';
import { IStockProduit } from 'src/app/model/stock-produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { DetailService } from './detail.service';
import { FournisseurProduitFormComponent } from './fournisseur-produit-form/fournisseur-produit-form.component';
import { StockProduitFormComponent } from './stock-produit-form/stock-produit-form.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {
  entites?: IProduit[];
  selectedEl: IProduit;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  loading: boolean;
  isSaving = false;
  ref: DynamicDialogRef;
  constructor(
    protected entityService: DetailService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
  }
  search(event: any): void {
    this.loadPage(0, event.query);
  }
  onSelect(event: any): void {
    this.selectedEl = event;

  }
  loadPage(page?: number, search?: String): void {
    const pageToLoad: number = page || this.page;
    const query: String = search || '';
    this.loading = true;
    this.entityService
      .queryDetails({
        page: pageToLoad,
        size: 999999,
        /*   size: this.itemsPerPage, */
        search: query
      })
      .subscribe(
        (res: HttpResponse<IProduit[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
  protected onSuccess(data: IProduit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['stock/produit-detail'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage

      },
    });
    this.entites = data || [];
    this.loading = false;
  }
  protected onError(): void {
    this.loading = false;
  }
  openEdit(): void { }
  disable(): void { }
  remove(): void { }
  enable(): void { }
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
  removeProduitFour(four: IFournisseurProduit): void { }
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
  editStock(stock: IStockProduit): void { }
  removeStock(stock: IStockProduit): void { }
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
