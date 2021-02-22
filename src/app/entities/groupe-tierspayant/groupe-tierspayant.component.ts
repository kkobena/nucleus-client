import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IGroupeTierspayant, GroupeTierspayant } from 'src/app/model/groupe-tierspayant.model';
import { ITEMS_PER_PAGE, SERVER_API_URL } from 'src/app/app.constants';
import { GroupeTierspayantService } from './groupe-tierspayant.service';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-groupe-tierspayant',
  templateUrl: './groupe-tierspayant.component.html',
  styles: [` 
  body .ui-inputtext{
   width: 100% !important;
}
   `],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class GroupeTierspayantComponent implements OnInit {
  entites?: IGroupeTierspayant[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IGroupeTierspayant;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;
  fileDialog: boolean;
  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    code: [null, [Validators.required]],
    phone: [],
    address: []
  });


  constructor(protected entityService: GroupeTierspayantService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService
    , private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
  }
  protected onSuccess(data: IGroupeTierspayant[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['tierspayant/groupe-tierspayants'], {
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
        (res: HttpResponse<IGroupeTierspayant[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        (res: HttpResponse<IGroupeTierspayant[]>) => this.onSuccess(res.body, res.headers, this.page),
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

  updateForm(entity: IGroupeTierspayant): void {
    this.editForm.patchValue({
      id: entity.id,
      libelle: entity.libelle,
      code: entity.code,
      phone: entity.phone,
      address: entity.address
    });
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.displayDialog = false;
    this.fileDialog = false;
    this.loadPage(0);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGroupeTierspayant>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  private createFromForm(): IGroupeTierspayant {
    return {
      ...new GroupeTierspayant(),
      id: this.editForm.get(['id'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      code: this.editForm.get(['code'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      address: this.editForm.get(['address'])!.value
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
    this.updateForm(new GroupeTierspayant());
    this.displayDialog = true;
  }
  onEdit(entity: IGroupeTierspayant): void {
    this.updateForm(entity);
    this.displayDialog = true;
  }
  delete(entity: IGroupeTierspayant): void {
    this.confirmDelete(entity.id);
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
  }
  onFilterTable(event: any): void {
    if (event.key === "Enter") {
      this.loadPage(0, event.target.value);

    }

  }
  showFileDialog(): void {
    this.fileDialog = true;
  }
  onUpload(event) {
    const formData: FormData = new FormData();
    const file = event.files[0];
    formData.append('importcsv', file, file.name);
    this.subscribeToSaveResponse(this.entityService.uploadFile(formData));
  }
}
