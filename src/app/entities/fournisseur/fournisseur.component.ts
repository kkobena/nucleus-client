import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Fournisseur, IFournisseur } from 'src/app/model/fournisseur.model';
import { IGroupeFournisseur } from 'src/app/model/groupe-fournisseur.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Validators, FormBuilder } from '@angular/forms';
import { FournisseurService } from './fournisseur.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, SelectItem } from 'primeng/api';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GroupeFournisseurService } from '../groupe-fournisseur/groupe-fournisseur.service';
import { NgxSpinnerService } from "ngx-spinner";
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-fournisseur',
  templateUrl: './fournisseur.component.html',
  styles: [` 
   body .ui-inputtext{
    width: 100% !important;
}
body .ui-dropdown{
    width: 100% !important;
}
    `],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class FournisseurComponent implements OnInit {

  entites?: IFournisseur[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IFournisseur;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;
  groupeFournisseurs: IGroupeFournisseur[] = [];
  groupes: SelectItem[];
  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]],
    addresspostale: [],
    // numFaxe: [],
    // addressePostal: [],
    phone: [],
    mobile: [],
    // site: [],
    groupeFournisseurId: [],

  });

  constructor(protected entityService: FournisseurService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService
    , private fb: FormBuilder,
    protected groupeFournisseurService: GroupeFournisseurService,
    private spinner: NgxSpinnerService,
    private messageService: MessageService
  ) { }



  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();

    });
  }
  protected onSuccess(data: IFournisseur[] | null, headers: HttpHeaders, page: number): void {

    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['grossiste/fournisseurs'], {
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
        (res: HttpResponse<IFournisseur[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        (res: HttpResponse<IFournisseur[]>) => this.onSuccess(res.body, res.headers, this.page),
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

  updateForm(entity: IFournisseur): void {
    this.groupes = [];
    this.groupeFournisseurService.query().subscribe(
      (res: HttpResponse<IGroupeFournisseur[]>) => {

        res.body.forEach(item => {
          this.groupes.push({ label: item.libelle, value: item.id });

        });
        this.editForm.patchValue({
          id: entity.id,
          code: entity.code,
          libelle: entity.libelle,
          groupeFournisseurId: entity.groupeFournisseurId,
          addresspostale: entity.addresspostale,
          // numFaxe: entity.numFaxe,
          phone: entity.phone,
          mobile: entity.mobile
          // site: entity.site
        });
        //this.groupeFournisseurId=entity.groupeFournisseurId;

        /*   this.groupeFournisseurs = res.body || []*/
      }
    );
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.displayDialog = false;
    this.loadPage(0);
    this.spinner.hide();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Enregistrement effectué avec success' });

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.spinner.hide();
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFournisseur>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );

  }
  private createFromForm(): IFournisseur {
    return {
      ...new Fournisseur(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      groupeFournisseurId: this.editForm.get(['groupeFournisseurId'])!.value,
      addresspostale: this.editForm.get(['addresspostale'])!.value,
      // numFaxe: this.editForm.get(['numFaxe'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      mobile: this.editForm.get(['mobile'])!.value
      // site: this.editForm.get(['site'])!.value
    };
  }
  save(): void {
    this.isSaving = true;
    this.spinner.show();
    const entity = this.createFromForm();
    if (entity.id !== undefined) {
      this.subscribeToSaveResponse(this.entityService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.entityService.create(entity));
    }
  }
  cancel(): void {
    this.displayDialog = false;
    this.spinner.hide();
  }
  addNewEntity(): void {
    this.updateForm(new Fournisseur());
    this.displayDialog = true;
  }
  onEdit(entity: IFournisseur): void {
    this.updateForm(entity);
    this.displayDialog = true;
  }
  delete(entity: IFournisseur): void {
    this.confirmDelete(entity.id);
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
  }
  trackById(index: number, item: IGroupeFournisseur): any {
    return item.id;
  }
  onFilterTable(event: any): void {
    if (event.key === "Enter") {
      this.loadPage(0, event.target.value);

    }

  }
}
