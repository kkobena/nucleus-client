import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IGroupeFournisseur, GroupeFournisseur } from 'src/app/model/groupe-fournisseur.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupeFournisseurService } from './groupe-fournisseur.service';
import { IResponseDto } from 'src/app/shared/util/response-dto';


@Component({
  selector: 'app-groupe-fournisseur',
  templateUrl: './groupe-fournisseur.component.html',
  styleUrls: ['./groupe-fournisseur.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class GroupeFournisseurComponent implements OnInit {
  fileDialog: boolean;
  responsedto!: IResponseDto;
  responseDialog: boolean;
  entites?: IGroupeFournisseur[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IGroupeFournisseur;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    addresspostale: [],
    numFaxe: [],
    email: [],
    tel: [],
    odre: []
  });

  constructor(protected entityService: GroupeFournisseurService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private messageService: MessageService,
    protected modalService: ConfirmationService
    , private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
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

  protected onSuccess(data: IGroupeFournisseur[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['grossiste/groupe-fournisseurs'], {
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
        search: query,
      })
      .subscribe(
        (res: HttpResponse<IGroupeFournisseur[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        (res: HttpResponse<IGroupeFournisseur[]>) => this.onSuccess(res.body, res.headers, this.page),
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

  updateForm(entity: IGroupeFournisseur): void {
    this.editForm.patchValue({
      id: entity.id,
      libelle: entity.libelle,
      addresspostale: entity.addresspostale,
      numFaxe: entity.numFaxe,
      email: entity.email,
      tel: entity.tel,
      odre: entity.odre,
    });
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.displayDialog = false;
    this.loadPage(0);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'info', summary: 'Enregistrement', detail: 'Opération effectuée avec succès' });
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupeFournisseur>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  private createFromForm(): IGroupeFournisseur {
    return {
      ...new GroupeFournisseur(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      addresspostale: this.editForm.get(['addresspostale'])!.value,
      numFaxe: this.editForm.get(['numFaxe'])!.value,
      email: this.editForm.get(['email'])!.value,
      tel: this.editForm.get(['tel'])!.value,
      odre: this.editForm.get(['odre'])!.value,
    };
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();

    if (entity.id !== undefined) {

      this.subscribeToSaveResponse(this.entityService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.entityService.create(entity));
    }
  }
  cancel(): void {
    this.displayDialog = false;
    this.fileDialog = false;
  }
  addNewEntity(): void {
    this.updateForm(new GroupeFournisseur());
    this.displayDialog = true;
  }
  onEdit(entity: IGroupeFournisseur): void {
    this.updateForm(entity);
    this.displayDialog = true;
  }
  delete(entity: IGroupeFournisseur): void {
    this.confirmDelete(entity.id);
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
  }
  search(event: any): void {
    this.loadPage(0, event.target.value);
  }
  showFileDialog(): void {
    this.fileDialog = true;
  }
}
