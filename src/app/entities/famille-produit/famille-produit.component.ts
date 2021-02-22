import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FamilleProduitService } from './famille-produit.service';
import { IFamilleProduit, FamilleProduit } from 'src/app/model/famille-produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService, SelectItem } from 'primeng/api';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieProduitService } from '../categorie-produit/categorie-produit.service';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormFamilleComponent } from './form-famille/form-famille.component';

@Component({
  selector: 'app-famille-produit',
  templateUrl: './famille-produit.component.html',
  styleUrls: ['./famille-produit.component.css'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class FamilleProduitComponent implements OnInit {
  fileDialog: boolean;
  ref: DynamicDialogRef;
  responsedto!: IResponseDto;
  responseDialog: boolean;
  entites?: IFamilleProduit[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IFamilleProduit;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]],
    categorieId: [null, [Validators.required]],

  });

  constructor(protected entityService: FamilleProduitService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private messageService: MessageService,
    private dialogService: DialogService,
    protected modalService: ConfirmationService
    , private fb: FormBuilder,
    protected categorieProduitService: CategorieProduitService
  ) { }



  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });

  }
  protected onSuccess(data: IFamilleProduit[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/famille-produits'], {
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
        size: ITEMS_PER_PAGE,
        search: query
      })
      .subscribe(
        (res: HttpResponse<IFamilleProduit[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        size: event.rows,
        search: ''
      })
      .subscribe(
        (res: HttpResponse<IFamilleProduit[]>) => this.onSuccess(res.body, res.headers, this.page),
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
  protected onSaveError(): void {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: "L'opération a échouée" });
  }



  cancel(): void {
    this.displayDialog = false;
    this.fileDialog = false;
  }


  delete(entity: IFamilleProduit): void {
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
    this.ref = this.dialogService.open(FormFamilleComponent, {
      data: { familleProduit: null },
      width: '40%',
      header: "Ajout d'une nouvelle famille de produit"
    });
    this.ref.onClose.subscribe((entity: IFamilleProduit) => {
      if (entity) {
        this.loadPage(0);

      }
    });
  }
  onEdit(entity: IFamilleProduit): void {
    this.ref = this.dialogService.open(FormFamilleComponent, {
      data: { familleProduit: entity },
      width: '40%',
      header: "Modification de " + entity.libelle
    });
    this.ref.onClose.subscribe((entity: IFamilleProduit) => {
      if (entity) {
        this.loadPage(0);
      }
    });
  }
}
