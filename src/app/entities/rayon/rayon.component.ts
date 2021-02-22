import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin } from 'src/app/model/magasin.model';
import { IRayon } from 'src/app/model/rayon.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { MagasinService } from '../magasin/magasin.service';
import { FormRayonComponent } from './form-rayon/form-rayon.component';
import { RayonService } from './rayon.service';

@Component({
  selector: 'app-rayon',
  templateUrl: './rayon.component.html',
  styleUrls: ['./rayon.component.scss'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class RayonComponent implements OnInit {
  magasin: IMagasin;
  clone: IMagasin;
  magasins?: IMagasin[];
  displayDialog: boolean;
  fileDialog: boolean;
  responseDialog: boolean;
  dialogueClone: boolean;
  responsedto?: IResponseDto;
  ref: DynamicDialogRef;
  loading: boolean;
  entites?: IRayon[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: IRayon[];
  constructor(
    protected entityService: RayonService,
    protected magasinService: MagasinService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.findUserMagasin();
  }
  onUpload(event) {
    const formData: FormData = new FormData();
    const file = event.files[0];
    formData.append('importcsv', file, file.name);
    this.uploadFileResponse(this.entityService.uploadFile(formData, this.magasin.id));
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
    this.dialogueClone = false;
    this.loadPage(0);
  }

  protected onSaveError(): void {

  }
  cancel(): void {
    this.displayDialog = false;
    this.fileDialog = false;
  }


  onChange(event: any): void {
    this.magasin = event.value;
    this.selectedEl = [];
    this.loadPage(0);
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
        (res: HttpResponse<IRayon[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        search: '',
        magasinId: this.magasin?.id
      })
      .subscribe(
        (res: HttpResponse<IRayon[]>) => this.onSuccess(res.body, res.headers, this.page),
        () => this.onError()
      );
  }

  protected onSuccess(data: IRayon[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['parametres/rayon'], {
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
  showFileDialog(): void {
    this.fileDialog = true;
  }
  addNewEntity(): void {
    this.ref = this.dialogService.open(FormRayonComponent, {
      data: { entity: null, magasin: this.magasin },
      width: '50%',
      header: 'Ajouter un nouveau rayon'
    });
    this.ref.onClose.subscribe((entity: IRayon) => {
      if (entity) {
        this.loadPage(0);

      }
    });
  }

  onEdit(entity: IRayon): void {
    this.ref = this.dialogService.open(FormRayonComponent, {
      data: { entity: entity, magasin: this.magasin },
      width: '50%',
      header: "Modification de " + entity.libelle
    });
    this.ref.onClose.subscribe((entity: IRayon) => {
      if (entity) {
        this.loadPage(0);
      }
    });
  }

  delete(entity: IRayon): void {
    this.confirmDelete(entity.id);
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
  private findUserMagasin(): void {
    this.magasinService.findConnectedUserStockages().then(magasin => {
      this.magasins = magasin;

    });
  }
  search(event: any): void {
    this.loadPage(0, event.target.value);
  }

  cloner(): void {
    this.dialogueClone = true;
  }
  onCloneChange(event: any): void {
    if (this.clone.id == this.magasin.id) {
      this.clone = null;
      this.messageService.add({ severity: 'error', summary: 'Avertissement', detail: 'Le point de stockage de destination doit être différent' });
    } else {
      this.clone = event.value;
    }
  }

  clonerRayon(): void {
    const rayons = this.selectedEl.map(e => e.id);
    this.uploadFileResponse(this.entityService.cloner(this.selectedEl, this.clone.id));
  }
}
