import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin } from 'src/app/model/magasin.model';
import { IUser } from 'src/app/model/user.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { MagasinService } from '../magasin/magasin.service';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {
  entites?: IUser[];
  displayDialog: boolean;
  fileDialog: boolean;
  responseDialog: boolean;
  responsedto?: IResponseDto;
  magasin?: IMagasin;
  ref: DynamicDialogRef;
  loading: boolean;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IUser;
  magasins?: IMagasin[];
  constructor
    (protected entityService: UserService,
      protected magasinService: MagasinService,
      protected activatedRoute: ActivatedRoute,
      protected router: Router,
      protected modalService: ConfirmationService,
      private dialogService: DialogService,
      private messageService: MessageService) { }

  ngOnInit(): void {
    this.findMagasins();
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

  protected onSaveError(): void {
    this.loadPage(0);
  }
  cancel(): void {
    this.displayDialog = false;
    this.fileDialog = false;
  }
  loadPage(page?: number, search?: String): void {
    const pageToLoad: number = page || this.page;
    const query: String = search || '';
    this.loading = true;
    this.entityService
      .query({
        page: pageToLoad,
        size: ITEMS_PER_PAGE,
        search: query,
        magasinId: this.magasin?.id
      })
      .subscribe(
        (res: HttpResponse<IUser[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  delete(entity: IUser): void {
    this.confirmDelete(entity.id);
  }
  enable(entity: IUser): void {
    entity.activated = true;
    this.subscribeToSaveResponse(this.entityService.enable(entity));
  }
  desable(entity: IUser): void {
    entity.activated = false;
    this.subscribeToSaveResponse(this.entityService.enable(entity));
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
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

  addNewEntity(): void {
    this.ref = this.dialogService.open(UserFormComponent, {
      data: { entity: null, magasin: this.magasin },
      width: '50%',
      header: 'Ajouter un nouvel utilisateur'
    });
    this.ref.onClose.subscribe((entity: IUser) => {
      if (entity) {
        this.loadPage(0);

      }
    });
  }

  onEdit(entity: IUser): void {
    this.ref = this.dialogService.open(UserFormComponent, {
      data: { entity: entity, magasin: this.magasin },
      width: '50%',
      header: "Modification de " + entity.firstName +" "+entity.lastName
    });
    this.ref.onClose.subscribe((entity: IUser) => {
      if (entity) {
        this.loadPage(0);
      }
    });
  }
  protected onSuccess(data: IUser[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['admin/user'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        magasinId: this.magasin?.id

      },
    });
    this.entites = data || [];
    this.loading = false;
  }
  protected onError(): void {
    this.loading = false;
  }
  onChange(event: any): void {
    this.magasin = event.value;
    this.loadPage(0);
  }
  search(event: any): void {
    this.loadPage(0, event.target.value);
  }
  showFileDialog(): void {
    this.fileDialog = true;
  }

  private findMagasins(): void {
    this.magasinService.findMagasins().then(magasin => {
      this.magasins = magasin;

    });
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      (res: HttpResponse<IUser>) => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(response: IUser | null): void {
    this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Opération effectuée avec succès' });
    this.ref.close(response);

  }
 
}
