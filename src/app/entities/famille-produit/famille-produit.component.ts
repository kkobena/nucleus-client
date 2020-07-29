import { Component, OnInit } from '@angular/core';
import { FamilleProduitService } from './famille-produit.service';
import { IFamilleProduit, FamilleProduit } from 'src/app/model/famille-produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieProduitService } from '../categorie-produit/categorie-produit.service';
import { ICategorieProduit } from 'src/app/model/categorie-produit.model';

@Component({
  selector: 'app-famille-produit',
  templateUrl: './famille-produit.component.html',
  styleUrls: ['./famille-produit.component.css']
})
export class FamilleProduitComponent implements OnInit {

  entites?: IFamilleProduit[];
  totalItems = 0;
  itemsPerPage =ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IFamilleProduit;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;
  categorieproduits: ICategorieProduit[] = [];

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]],
    categorieId: [],
  
  });

constructor(protected entityService: FamilleProduitService,
  protected activatedRoute: ActivatedRoute,
  protected router: Router,
  protected modalService: ConfirmationService
  , private fb: FormBuilder,
  protected categorieProduitService: CategorieProduitService,
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

loadPage(page?: number): void {
  const pageToLoad: number = page || this.page;
   this.loading = true;
   this.entityService
       .query({
           page: pageToLoad,
           size: this.itemsPerPage
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
          size: event.rows
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

updateForm(entity: IFamilleProduit): void {
  this.editForm.patchValue({
    id: entity.id,
    code: entity.code,
    libelle: entity.libelle,
    categorieId: entity.categorieId,
  });
  this.categorieProduitService.query().subscribe((res: HttpResponse<ICategorieProduit[]>) => (this.categorieproduits = res.body || []));
}
protected onSaveSuccess(): void {
  this.isSaving = false;
  this.displayDialog=false;
  this.loadPage(0);
 
}
protected onSaveError(): void {
  this.isSaving = false;
}
protected subscribeToSaveResponse(result: Observable<HttpResponse<IFamilleProduit>>): void {
  result.subscribe(
    () => this.onSaveSuccess(),
    () => this.onSaveError()
  );
}
private createFromForm(): IFamilleProduit {
  return {
    ...new FamilleProduit(),
    id: this.editForm.get(['id'])!.value,
    code: this.editForm.get(['code'])!.value,
    libelle: this.editForm.get(['libelle'])!.value,
    categorieId: this.editForm.get(['categorieId'])!.value,
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
  this.displayDialog=false;
}
addNewEntity():void {
  this.updateForm(new FamilleProduit());
  this.displayDialog=true;
}
onEdit(entity: IFamilleProduit):void {
  this.updateForm(entity);
  this.displayDialog=true;
}
delete(entity: IFamilleProduit): void {
  this.confirmDelete(entity.id);
}
confirmDelete(id: number): void {
  this.confirmDialog(id);
}
trackById(index: number, item: ICategorieProduit): any {
  return item.id;
}
}
