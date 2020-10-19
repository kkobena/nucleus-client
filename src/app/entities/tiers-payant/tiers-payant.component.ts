import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService, MenuItem, SelectItem } from 'primeng';
import { TiersPayantService } from './tiers-payant.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { ITierspayant, Tierspayant } from 'src/app/model/tierspayant.model';
import { ClientService } from '../client/client.service';
import { IClient } from 'src/app/model/client.model';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { IGroupeTierspayant } from 'src/app/model/groupe-tierspayant.model';
import { GroupeTierspayantService } from '../groupe-tierspayant/groupe-tierspayant.service';
import { RisqueService } from '../remise/risque.service';
import { ModelFactureService } from '../model-facture/model-facture.service';

@Component({
  selector: 'app-tiers-payant',
  templateUrl: './tiers-payant.component.html',
  styles: [` 
  body .ui-inputtext{
   width: 100% !important;
}
body .ui-dropdown{
    width: 100% !important;
}
.firstColumn {
  border: none !important; 
    text-align: left;
}
.secondColumn {
  text-align: left;
  font-weight: 400;
  border: none !important; 
  color:blue;
}
.nucleus-dataview-list tbody tr{
  
  border-bootom: 1px solid #dedede !important;
}

   `],
  providers: [MessageService],
  encapsulation: ViewEncapsulation.None
})
export class TiersPayantComponent implements OnInit {
  groupeTierspayants: IGroupeTierspayant[] = [];
  groupes: SelectItem[];
  entites?: ITierspayant[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: ITierspayant;
  selectedClient: IClient;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;
  fileDialog: boolean;
  responseDialog: boolean;
  items: MenuItem[];
  clients?: IClient[];
  responsedto!: IResponseDto;
  risques: SelectItem[];
  modelFactures: SelectItem[];
  types = [{ label: 'ASSURANCE', value: 'ASSURANCE' }, { label: 'CARNET', value: 'CARNET' }];
  editForm = this.fb.group({});

  constructor(protected entityService: TiersPayantService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService
    , private fb: FormBuilder,
    private messageService: MessageService,
    protected groupetierspayantService: GroupeTierspayantService,
    protected risqueService: RisqueService,
    protected modelFactureService: ModelFactureService

  ) {
    this.initialyseForm();
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Information tiers-paynt', icon: 'fa fa-fw fa-home' },
      { label: 'Information clients', icon: 'fa fa-user-o' },
      { label: 'Achats', icon: 'fa fa-bitcoin' }


    ];

    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
    });
  }
  updateForm(entity: ITierspayant): void {
    this.editForm.patchValue({
      id: entity.id,
      libelCourt: entity.libelCourt,
      libelLong: entity.libelLong,
      plafond: entity.plafond,
      typePlafond: entity.typePlafond,
      typeTp: entity.typeTp,
      codeComptable: entity.codeComptable,
      remiseForfetaire: entity.remiseForfetaire,
      montantMaxFacture: entity.montantMaxFacture,
      nbreBordereaux: entity.nbreBordereaux,
      groupetpId: entity.groupetpId,
      risqueId: entity.risqueId,
      modelFactureId: entity.modelFactureId,
      mobile: entity.mobile,
      address: entity.address,
    });
  }
  private createFromForm(): ITierspayant {
    return {
      ...new Tierspayant(),
      id: this.editForm.get(['id'])!.value,
      libelCourt: this.editForm.get(['libelCourt'])!.value,
      libelLong: this.editForm.get(['libelLong'])!.value,
      address: this.editForm.get(['address'])!.value,
      modelFactureId: this.editForm.get(['modelFactureId'])!.value,
      groupetpId: this.editForm.get(['groupetpId'])!.value,
      risqueId: this.editForm.get(['risqueId'])!.value,
      nbreBordereaux: this.editForm.get(['nbreBordereaux'])!.value,
      montantMaxFacture: this.editForm.get(['montantMaxFacture'])!.value,
      remiseForfetaire: this.editForm.get(['remiseForfetaire'])!.value,
      codeComptable: this.editForm.get(['codeComptable'])!.value,
      typeTp: this.editForm.get(['typeTp'])!.value,
      typePlafond: this.editForm.get(['typePlafond'])!.value,
      plafond: this.editForm.get(['plafond'])!.value,
      mobile: this.editForm.get(['mobile'])!.value
    };
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    console.log(entity);
    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.entityService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.entityService.create(entity));
    }
  };


  protected onSuccess(data: ITierspayant[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['tierspayant/tierspayant'], {
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
        size: 999999,
        /*   size: this.itemsPerPage, */
        search: query
      })
      .subscribe(
        (res: HttpResponse<ITierspayant[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
        (res: HttpResponse<ITierspayant[]>) => this.onSuccess(res.body, res.headers, this.page),
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
  delete(entity: ITierspayant): void {
    this.confirmDelete(entity.id);
  }
  confirmDelete(id: number): void {
    this.confirmDialog(id);
  }
  onFilterTable(event: any): void {
    if (event.key === "Enter") {
      this.loadPageClient(0, event.target.value);

    }

  }
  showFileDialog(): void {
    this.fileDialog = true;
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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITierspayant>>): void {
    result.subscribe(
      (res: HttpResponse<ITierspayant>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: ITierspayant | null): void {
    console.log(response);
    this.selectedEl = response;
    this.displayDialog = false;
    this.isSaving = false;
  }


  protected onPocesCsvSuccess(responseDto: IResponseDto | null): void {
    this.responsedto = responseDto;
    this.isSaving = false;
    this.displayDialog = false;
    this.responseDialog = true;
    this.fileDialog = false;
    this.loadPage(0);
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
  cancel(): void {
    this.displayDialog = false;
    this.fileDialog = false;
  }
  onEditClient(client: IClient): void {
  }
  onEdit(): void {
    this.updateForm(this.selectedEl);
    this.displayDialog = true;
  }
  initialyseForm(): void {
    this.editForm = this.fb.group({
      id: [],
      libelCourt: [null, [Validators.required]],
      libelLong: [null, [Validators.required]],
      plafond: [0],
      typePlafond: [],
      typeTp: [null, [Validators.required]],
      codeComptable: [],
      remiseForfetaire: [0],
      montantMaxFacture: [0],
      nbreBordereaux: [0],
      groupetpId: [],
      risqueId: [],
      modelFactureId: [],
      mobile: [null, [Validators.required]],
      address: [],

    });

  }
  addNewEntity(): void {
    this.groupes = [];
    this.risques = [];
    this.modelFactures = [];
    this.initialyseForm();
    //this.updateForm(new Tierspayant());

    this.populate();
    this.displayDialog = true;
  }
  async populate() {
    let response = await this.groupetierspayantService.queryPromise({
      search: ''
    });
    response.forEach(item => {
      this.groupes.push({ label: item.libelle, value: item.id });

    });

    let risquesResponse = await this.risqueService.query({});
    risquesResponse.forEach(e => {
      this.risques.push({ label: e.libelle, value: e.id });
    });

    let modelFacturesResponse = await this.modelFactureService.feth({});
    modelFacturesResponse.forEach(e => {
      this.modelFactures.push({ label: e.libelle, value: e.id });
    });
  }
  search(event: any): void {
    console.log(event);
    this.loadPage(0, event.query);
  }
  onSelect(event: any): void {
    this.selectedEl = event;
    this.loadPageClient();
  }
  loadClient(event: LazyLoadEvent): void {
    this.page = event.first / event.rows;
    this.loading = true;
    this.clientService
      .queryTiersPayant({
        page: this.page,
        size: event.rows,
        tierspayantId: this.selectedEl.id
      })
      .subscribe(
        (res: HttpResponse<IClient[]>) => this.onClientSuccess(res.body, res.headers, this.page),
        () => this.onError()
      );
  }

  protected onClientSuccess(data: IClient[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['tierspayant/tierspayant'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage

      },
    });
    this.clients = data || [];
    this.loading = false;
  }
  loadPageClient(page?: number, search?: String): void {
    const pageToLoad: number = page || this.page;
    const query: String = search || '';
    this.loading = true;
    this.clientService
      .queryTiersPayant({
        page: pageToLoad,
        size: this.itemsPerPage,
        search: query,
        tierspayantId: this.selectedEl.id
      })
      .subscribe(
        (res: HttpResponse<IClient[]>) => this.onClientSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }
}
