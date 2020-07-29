import { Component, OnInit } from '@angular/core';
import { ITypeRisque,TypeRisque } from 'src/app/model/type-risque.model';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';
import {ConfirmationService} from 'primeng/api';
import {ActivatedRoute,  Router} from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';
import { TypeRisqueService } from './type-risque.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-type-risque',
  templateUrl: './type-risque.component.html',
  styleUrls: ['./type-risque.component.css']
})
export class TypeRisqueComponent implements OnInit {
  entites?: ITypeRisque[];
    totalItems = 0;
    itemsPerPage =ITEMS_PER_PAGE;
    page: number = 0;
    selectedEl: ITypeRisque;
    loading: boolean;
    isSaving = false;
    displayDialog: boolean;
  
    editForm = this.fb.group({
      id: [],
      code: [null, [Validators.required]],
      libelle: [null, [Validators.required]]
    
    });

  constructor(protected entityService: TypeRisqueService,
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
  protected onSuccess(data: ITypeRisque[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/type-risque'], {
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
           (res: HttpResponse<ITypeRisque[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
          (res: HttpResponse<ITypeRisque[]>) => this.onSuccess(res.body, res.headers, this.page),
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

updateForm(entity: ITypeRisque): void {
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
protected subscribeToSaveResponse(result: Observable<HttpResponse<ITypeRisque>>): void {
  result.subscribe(
    () => this.onSaveSuccess(),
    () => this.onSaveError()
  );
}
private createFromForm(): ITypeRisque {
  return {
    ...new TypeRisque(),
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
  this.updateForm(new TypeRisque());
  this.displayDialog=true;
}
onEdit(entity: ITypeRisque):void {
  this.updateForm(entity);
  this.displayDialog=true;
}
delete(entity: ITypeRisque): void {
  this.confirmDelete(entity.id);
}
confirmDelete(id: number): void {
  this.confirmDialog(id);
}
}
