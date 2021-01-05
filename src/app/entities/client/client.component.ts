import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { IAyantDroit } from 'src/app/model/ayant-droit.model';
import { IClient, ICompteClient } from 'src/app/model/client.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientService } from './client.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AyantDroitService } from '../ayant-droit/ayant-droit.service';
import { CompteClientService } from './compte-client.service';
import { CompteClientFormComponent } from './client-form/compte-client-form/compte-client-form.component';
import { AyantDroitFormComponent } from '../ayant-droit/ayant-droit-form/ayant-droit-form.component';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: [` 
  .p-toolbar {
     padding: 0 !important;
}
   .p-autocomplete{ width: 100%; }
   .invoice{
 padding:0;
   }
   .invoice,.invoice .invoice-items {
     margin-top: 0; 
     padding-top: 0;
    
    }
  body .ui-inputtext{
   width: 100% !important;
}
body .ui-dropdown{
    width: 100% !important;
}

.secondColumn {
 
  color:blue;
}

.actions{
  text-align:center  !important;
}
 .invoice-table {
      width: 100%;
    border-collapse: collapse;
}
.invoice-table tr{
       border-bottom: 1px solid #dee2e6;
}
.invoice-table td:first-child {
    text-align: left;
}
.invoice-table td {
    padding: 0.8rem;
 
}
.p-datatable .p-datatable-header {
   
    text-align: center;
}

   `],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None

})
export class ClientComponent implements OnInit {
  entites?: IClient[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  loading: boolean;
  isSaving = false;
  selectedEl: IClient;
  selectedAyantDroit: IAyantDroit;
  displayDialog: boolean;
  fileDialog: boolean;
  responseDialog: boolean;
  ayantDroits?: IAyantDroit[];
  responsedto!: IResponseDto;
  splitbuttons: MenuItem[];
  ref: DynamicDialogRef;
  constructor(
    protected entityService: ClientService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService,
    protected ayantDroitService: AyantDroitService,
    protected compteClientService: CompteClientService
  ) {

  }

  ngOnInit(): void {
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
  protected onSuccess(data: IClient[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['tierspayant/clients'], {
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

  loadPage(page?: number, search?: String): void {
    const pageToLoad: number = page || this.page;
    const query: String = search || '';
    this.loading = true;
    this.entityService
      .query({
        page: pageToLoad,
        size: 999999,
        /*   size: this.itemsPerPage, */
        search: query
      })
      .subscribe(
        (res: HttpResponse<IClient[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
  lazyLoading(event: LazyLoadEvent): void {
    this.page = event.first / event.rows;
    this.loading = true;
    this.entityService
      .query({
        page: this.page,
        size: event.rows
      })
      .subscribe(
        (res: HttpResponse<IClient[]>) => this.onSuccess(res.body, res.headers, this.page),
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
  delete(): void {
    this.confirmDelete(this.selectedEl.id);
  }

  editAyantDroit(ayntDroit: IAyantDroit): void {
    this.ref = this.dialogService.open(AyantDroitFormComponent, {
      data: { client: this.selectedEl, ayantDroit: ayntDroit },
      width: '50%',
      header: "Modification de l'ayant droit [ " + ayntDroit.firstName + " " + ayntDroit.lastName + " ]"
    });
    this.ref.onClose.subscribe((entity: IAyantDroit) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(client => { this.selectedEl = client; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Ayant droit   modifié avec success' });
      }
    });
  }

  deleteAyantDroit(ayntDroit: IAyantDroit): void {
    this.modalService.confirm({
      message: 'Voulez-vous supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.ayantDroitService.delete(ayntDroit.id).subscribe(() => {
          this.entityService.findPromise(this.selectedEl.id).then(client => { this.selectedEl = client; });
        },
          (e: HttpResponse<any>) => {

            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
          }

        );
      }
    });

  }


  deleteCompteClient(compteClient: ICompteClient): void {
    this.modalService.confirm({
      message: 'Voulez-vous supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.compteClientService.delete(compteClient.id).subscribe(() => {
          this.entityService.findPromise(this.selectedEl.id).then(client => { this.selectedEl = client; });
        },
          (e: HttpResponse<any>) => {

            this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
          }

        );
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

  search(event: any): void {
    this.loadPage(0, event.query);
  }
  onSelect(event: any): void {
    this.selectedEl = event;
  }
  loadClient(event: LazyLoadEvent): void {
    this.page = event.first / event.rows;
    this.loading = true;
    this.entityService
      .queryTiersPayant({
        page: this.page,
        size: event.rows,
        tierspayantId: this.selectedEl.id
      })
      .subscribe(
        (res: HttpResponse<IClient[]>) => this.onClientSuccess(res.body, res.headers, this.page),
        () => this.onError()
      );
  }

  protected onClientSuccess(data: IClient[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['tierspayant/clients'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage

      },
    });

    this.loading = false;
  }

  onEdit(): void {
    this.ref = this.dialogService.open(ClientFormComponent, {
      data: { entity: this.selectedEl },
      width: '95%',
      height: 'auto',
      header: "Modification du client " + this.selectedEl.firstName + " " + this.selectedEl.lastName
    });
    this.ref.onClose.subscribe((entity: IClient) => {
      if (entity) {
        this.selectedEl = entity;
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Modification effectuée avec succes' });
      }
    });



  }
  addNewEntity(): void {
    this.ref = this.dialogService.open(ClientFormComponent, {
      data: { entity: null },
      width: '95%',
      height: 'auto',
      header: 'Ajouter un nouveau client'
    });
    this.ref.onClose.subscribe((entity: IClient) => {
      if (entity) {
        this.selectedEl = entity;
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Client ajouté avec success' });
      }
    });
  }
  addAyantDroit(): void {
    this.ref = this.dialogService.open(AyantDroitFormComponent, {
      data: { client: this.selectedEl, ayantDroit: null },
      width: '50%',
      header: 'Ajouter un nouvel ayant droit'
    });
    this.ref.onClose.subscribe((entity: IAyantDroit) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(client => { this.selectedEl = client; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Ayant droit   ajouté avec success' });
      }
    });
  }
  editCompteClient(compteClient: ICompteClient): void {
    this.ref = this.dialogService.open(CompteClientFormComponent, {
      data: { client: this.selectedEl, compteClient: compteClient },
      width: '50%',
      header: 'Modification du compte'
    });
    this.ref.onClose.subscribe((entity: ICompteClient) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(client => { this.selectedEl = client; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'compte ajouté avec success' });
      }
    });
  }
  addCompteClient(): void {
    this.ref = this.dialogService.open(CompteClientFormComponent, {
      data: { client: this.selectedEl, compteClient: null },
      width: '50%',
      header: 'Ajouter un nouveau compte'
    });
    this.ref.onClose.subscribe((entity: ICompteClient) => {
      if (entity) {
        this.entityService.findPromise(this.selectedEl.id).then(client => { this.selectedEl = client; });
        this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'compte ajouté avec success' });
      }
    });
  }

}
