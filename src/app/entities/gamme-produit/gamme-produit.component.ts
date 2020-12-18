import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IGammeProduit, GammeProduit } from 'src/app/model/gamme-produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Validators, FormBuilder } from '@angular/forms';
import { FormeProduitService } from '../forme-produit/forme-produit.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormProduit } from 'src/app/model/form-produit.model';
import { GammeProduitService } from './gamme-produit.service';

@Component({
  selector: 'app-gamme-produit',
  templateUrl: './gamme-produit.component.html',
  styles: [` 
  body .ui-inputtext{
   width: 100% !important;
}
   `],
  encapsulation: ViewEncapsulation.None
})
export class GammeProduitComponent implements OnInit {
  entites?: IGammeProduit[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IGammeProduit;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]]

  });

  constructor(protected entityService: GammeProduitService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService
    , private fb: FormBuilder
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

  updateForm(entity: IGammeProduit): void {
    this.editForm.patchValue({
      id: entity.id,
      code: entity.code,
      libelle: entity.libelle
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
  private createFromForm(): IGammeProduit {
    return {
      ...new GammeProduit(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      libelle: this.editForm.get(['libelle'])!.value
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
  }
  addNewEntity(): void {
    this.updateForm(new GammeProduit());
    this.displayDialog = true;
  }
  onEdit(entity: IGammeProduit): void {
    this.updateForm(entity);
    this.displayDialog = true;
  }
  delete(entity: IGammeProduit): void {
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
}
