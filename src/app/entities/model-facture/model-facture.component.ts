import { Component, OnInit } from '@angular/core';
import { IModelFacture, ModelFacture } from 'src/app/model/model-facture.model';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { LazyLoadEvent, ConfirmationService } from 'primeng';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelFactureService } from './model-facture.service';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-model-facture',
  templateUrl: './model-facture.component.html',
  styleUrls: ['./model-facture.component.css']
})
export class ModelFactureComponent implements OnInit {

  entites?:   IModelFacture[];
  totalItems = 0;
  itemsPerPage =ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl:   IModelFacture;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;

  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]]
  
  });

constructor(protected entityService: ModelFactureService,
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
  protected onSuccess(data:   IModelFacture[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/models-factures'], {
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
           (res: HttpResponse<  IModelFacture[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
          (res: HttpResponse<  IModelFacture[]>) => this.onSuccess(res.body, res.headers, this.page),
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

updateForm(entity:   IModelFacture): void {
  this.editForm.patchValue({
    id: entity.id,
    code: entity.code,
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
protected subscribeToSaveResponse(result: Observable<HttpResponse<  IModelFacture>>): void {
  result.subscribe(
    () => this.onSaveSuccess(),
    () => this.onSaveError()
  );
}
private createFromForm():   IModelFacture {
  return {
    ...new ModelFacture(),
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
  this.displayDialog=false;
}
addNewEntity():void {
  this.updateForm(new ModelFacture());
  this.displayDialog=true;
}
onEdit(entity:   IModelFacture):void {
  this.updateForm(entity);
  this.displayDialog=true;
}
delete(entity:   IModelFacture): void {
  this.confirmDelete(entity.id);
}
confirmDelete(id: number): void {
  this.confirmDialog(id);
}

}
