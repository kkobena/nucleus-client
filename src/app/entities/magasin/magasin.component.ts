import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin } from 'src/app/model/magasin.model';
import { ITEMS_PER_PAGE, PRINCIPAL, POINT_DE_VENTE, SAFETY_STOCK } from 'src/app/shared/constants/pagination.constants';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { FormInfosTicketComponent } from './form-infos-ticket/form-infos-ticket.component';
import { FormMagasinComponent } from './form-magasin/form-magasin.component';
import { FormManagerComponent } from './form-manager/form-manager.component';
import { FormStockageComponent } from './form-stockage/form-stockage.component';
import { MagasinService } from './magasin.service';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class MagasinComponent implements OnInit {
  isSaving = false;
  selectedEl: IMagasin;
  displayDialog: boolean;
  fileDialog: boolean;
  responseDialog: boolean;
  responsedto?: IResponseDto;
  ref: DynamicDialogRef;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  pointDeVente: number;
  stockSecurity: number;
  magasinPrincipal: number;
  page: number = 0;
  loading: boolean;
  entites?: IMagasin[] = [];
  constructor(
    protected entityService: MagasinService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.pointDeVente = POINT_DE_VENTE;
    this.stockSecurity = SAFETY_STOCK;
    this.magasinPrincipal = PRINCIPAL;
    this.findUserMagasin();
    this.loadPage(0);


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
  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;
    this.loading = true;
    this.entityService
      .query({})
      .subscribe(
        (res: HttpResponse<IMagasin[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  protected onSuccess(data: IMagasin[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/magasin'], {
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

  addNewEntity(): void {
    this.ref = this.dialogService.open(FormMagasinComponent, {
      data: { entity: null },
      width: '60%',
      header: 'Ajouter un emplacement de stockage'
    });
    this.ref.onClose.subscribe((entity: IMagasin) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(magasin => { this.selectedEl = magasin; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }
  private findUserMagasin(): void {
    this.entityService.findConnectedUserMagasin().then(magasin => {
      this.selectedEl = magasin;

    });
  }

  onEdit(): void {
    this.ref = this.dialogService.open(FormMagasinComponent, {
      data: { entity: this.selectedEl },
      width: '60%',
      header: "Modification du magasin " + this.selectedEl.nomLong
    });
    this.ref.onClose.subscribe((entity: IMagasin) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(magasin => { this.selectedEl = magasin; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }
  delete(): void {
    this.confirmDelete(this.selectedEl.id);
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
  }
  confirmDialog(id: number) {
    this.modalService.confirm({
      message: 'Voulez-vous supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entityService.delete(id).subscribe(() => {
          this.selectedEl = null;
        },
          (e: HttpResponse<any>) => {

            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Opération  a échoué' });
          }

        );
      }
    });
  }

  editStock(magasin: IMagasin): void {
    this.ref = this.dialogService.open(FormStockageComponent, {
      data: { entity: this.selectedEl, stockage: magasin },
      width: '40%',
      header: "Modufication du libellé de stockage " + magasin.nomLong
    });
    this.ref.onClose.subscribe((entity: IMagasin) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(magasin => { this.selectedEl = magasin; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }
  removeStock(magasin: IMagasin): void {
    this.deleteStock(magasin.id);


  }
  addStockage(): void {
    this.ref = this.dialogService.open(FormStockageComponent, {
      data: { entity: this.selectedEl, stockage: null },
      width: '40%',
      header: "Gestion des emplacements de stockage du magasin " + this.selectedEl.nomLong
    });
    this.ref.onClose.subscribe((entity: IMagasin) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(magasin => { this.selectedEl = magasin; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }
  addManager(): void {
    this.ref = this.dialogService.open(FormManagerComponent, {
      data: { entity: this.selectedEl, manager: null },
      width: '40%',
      header: "Gerer le gestionnaire du magasin  " + this.selectedEl.nomLong
    });
    this.ref.onClose.subscribe((entity: IMagasin) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(magasin => { this.selectedEl = magasin; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }
  onEditInfosTicket(): void {
    this.ref = this.dialogService.open(FormInfosTicketComponent, {
      data: { entity: this.selectedEl },
      width: '40%',
      header: "Modification des informations du ticket " + this.selectedEl.nomLong
    });
    this.ref.onClose.subscribe((entity: IMagasin) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(magasin => { this.selectedEl = magasin; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
      }
    });
  }


  deleteStock(id: number) {
    this.modalService.confirm({
      message: 'Voulez-vous supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entityService.delete(id).subscribe(() => {
          this.entityService.findPromise(this.selectedEl.id).then(magasin => { this.selectedEl = magasin; });
        },
          (e: HttpResponse<any>) => {

            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Opération  a échoué' });
          }

        );
      }
    });
  }

}
