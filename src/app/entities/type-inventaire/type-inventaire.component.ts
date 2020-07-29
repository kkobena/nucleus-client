import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent } from 'primeng';
import { TypeInventaireService } from './type-inventaire.service';
import { ITypeInventaire, TypeInventaire } from 'src/app/model/type-inventaire.model';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-type-inventaire',
  templateUrl: './type-inventaire.component.html',
  styleUrls: ['./type-inventaire.component.css']
})
export class TypeInventaireComponent implements OnInit {

  entites?:   ITypeInventaire[];
  totalItems = 0;
  itemsPerPage =ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl:   ITypeInventaire;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;

  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]]
  
  });

constructor(protected entityService: TypeInventaireService,
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
  protected onSuccess(data:   ITypeInventaire[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/type-inventaires'], {
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
           (res: HttpResponse<ITypeInventaire[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
          (res: HttpResponse<  ITypeInventaire[]>) => this.onSuccess(res.body, res.headers, this.page),
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

updateForm(entity:   ITypeInventaire): void {
  this.editForm.patchValue({
    id: entity.id,
    libelle: entity.libelle
  });
}
protected onSaveSuccess(): void {
  this.isSaving = false;
  this.displayDialog=false;
  this.loadPage(0);
 
}
protected onSaveError(): void {
  this.isSaving = false;
}
protected subscribeToSaveResponse(result: Observable<HttpResponse<  ITypeInventaire>>): void {
  result.subscribe(
    () => this.onSaveSuccess(),
    () => this.onSaveError()
  );
}
private createFromForm():   ITypeInventaire {
  return {
    ...new TypeInventaire(),
    id: this.editForm.get(['id'])!.value,
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
  this.displayDialog=false;
}
addNewEntity():void {
  this.updateForm(new TypeInventaire());
  this.displayDialog=true;
}
onEdit(entity:   ITypeInventaire):void {
  this.updateForm(entity);
  this.displayDialog=true;
}
delete(entity:   ITypeInventaire): void {
  this.confirmDelete(entity.id);
}
confirmDelete(id: number): void {
  this.confirmDialog(id);
}
}
