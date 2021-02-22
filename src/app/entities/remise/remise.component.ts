import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IRemise, Remise } from 'src/app/model/remise.model';
import { Validators, FormBuilder } from '@angular/forms';
import { ITEMS_PER_PAGE } from '../../shared/constants/pagination.constants';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { RemiseService } from './remise.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormRemiseComponent } from './form-remise/form-remise.component';
@Component({
  selector: 'app-remise',
  templateUrl: './remise.component.html',
  styleUrls: ['./remise.component.css'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class RemiseComponent implements OnInit {
  entites?: IRemise[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IRemise;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;
  ref: DynamicDialogRef;
  editForm = this.fb.group({
    id: [],
    valeur: [null, [Validators.required]],
    remiseValue: [null, [Validators.required]]

  });

  constructor(protected entityService: RemiseService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService,
    private dialogService: DialogService
    , private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
  }
  protected onSuccess(data: IRemise[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/remises'], {
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
        (res: HttpResponse<IRemise[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        (res: HttpResponse<IRemise[]>) => this.onSuccess(res.body, res.headers, this.page),
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
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRemise>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }


  cancel(): void {
    this.displayDialog = false;
  }
  addNewEntity(): void {
    this.ref = this.dialogService.open(FormRemiseComponent, {
      data: { remise: null },
      width: '40%',
      height: '300',
      header: "Ajout d'une nouvelle famille de produit"
    });
    this.ref.onClose.subscribe((entity: IRemise) => {
      if (entity) {
        this.loadPage(0);

      }
    });
  }
  onEdit(entity: IRemise): void {
    this.ref = this.dialogService.open(FormRemiseComponent, {
      data: { remise: entity },
      width: '40%',
      height: '200',
      header: "Modification de la remise" + entity.remiseValue
    });
    this.ref.onClose.subscribe((entity: IRemise) => {
      if (entity) {
        this.loadPage(0);
      }
    });
  }
  delete(entity: IRemise): void {
    this.confirmDelete(entity.id);
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
  }


  disabledDialog(entity: IRemise) {
    this.modalService.confirm({
      message: 'Voulez-vous desactiver cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entityService.disabled(entity.id).subscribe(() => {
          this.loadPage(0);

        });
      }
    });
  }
}
