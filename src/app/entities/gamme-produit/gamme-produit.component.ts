import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IGammeProduit } from 'src/app/model/gamme-produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GammeProduitService } from './gamme-produit.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { FormGammeComponent } from './form-gamme/form-gamme.component';

@Component({
  selector: 'app-gamme-produit',
  templateUrl: './gamme-produit.component.html',
  styles: [` 
  body .ui-inputtext{
   width: 100% !important;
}
   `],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class GammeProduitComponent implements OnInit {
  fileDialog: boolean;
  ref: DynamicDialogRef;
  responsedto!: IResponseDto;
  responseDialog: boolean;
  entites?: IGammeProduit[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IGammeProduit;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;



  constructor(protected entityService: GammeProduitService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private dialogService: DialogService,
    protected modalService: ConfirmationService

  ) { }



  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
  }
  protected onSuccess(data: IGammeProduit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/gamme-produits'], {
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
        size: this.itemsPerPage,
        search: query
      })
      .subscribe(
        (res: HttpResponse<IGammeProduit[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
  lazyLoading(event: LazyLoadEvent): void {
    console.log(event.first / event.rows);
    this.page = event.first / event.rows;
    this.loading = true;
    this.entityService
      .query({
        page: this.page,
        size: event.rows
      })
      .subscribe(
        (res: HttpResponse<IGammeProduit[]>) => this.onSuccess(res.body, res.headers, this.page),
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
          this.loadPage(0);

        });
      }
    });
  }


  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.displayDialog = false;
    this.loadPage(0);

  }
  protected onSaveError(): void {
    this.isSaving = false;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGammeProduit>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }


  cancel(): void {
    this.displayDialog = false;
    this.fileDialog = false;
  }


  delete(entity: IGammeProduit): void {
    this.confirmDelete(entity.id);
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
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
  search(event: any): void {
    this.loadPage(0, event.target.value);
  }
  showFileDialog(): void {
    this.fileDialog = true;
  }

  addNewEntity(): void {
    this.ref = this.dialogService.open(FormGammeComponent, {
      data: { gamme: null },
      width: '40%',

      header: "Ajout d'une nouvelle gamme de produit"
    });
    this.ref.onClose.subscribe((entity: IGammeProduit) => {
      if (entity) {
        this.loadPage(0);

      }
    });
  }
  onEdit(entity: IGammeProduit): void {
    this.ref = this.dialogService.open(FormGammeComponent, {
      data: { gamme: entity },
      width: '40%',

      header: "Modification de " + entity.libelle
    });
    this.ref.onClose.subscribe((entity: IGammeProduit) => {
      if (entity) {
        this.loadPage(0);
      }
    });
  }
}
