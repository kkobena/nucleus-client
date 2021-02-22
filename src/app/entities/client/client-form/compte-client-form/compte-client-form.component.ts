import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { TiersPayantService } from 'src/app/entities/tiers-payant/tiers-payant.service';
import { CompteClient, IClient, ICompteClient } from 'src/app/model/client.model';
import { CategorieAssurance } from 'src/app/model/enumerations/categorie-assurance.model';
import { ITierspayant } from 'src/app/model/tierspayant.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { CompteClientService } from '../../compte-client.service';

@Component({
  selector: 'app-compte-client-form',
  templateUrl: './compte-client-form.component.html',
  styleUrls: ['./compte-client-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})

export class CompteClientFormComponent implements OnInit {
  isSaving: boolean = false;
  client: IClient;
  compteClient: ICompteClient;
  tierspayantsSearch: ITierspayant[];
  types = [
    { label: 'CARNET', value: 'CARNET' },
    { label: 'ASSURANCE', value: 'ASSURANCE' }
  ];


  editForm = this.fb.group({
    id: [],
    taux: [null, [Validators.required]],
    tierspayantId: [null, [Validators.required]],
    plafondJournalier: [0],
    plafondMensuel: [0],
    typeClient: ['ASSURANCE', [Validators.required]],
    absolute: [],
    numMaticule: [],
  });
  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder,
    protected compteClientService: CompteClientService, private messageService: MessageService,
    protected tierspayantService: TiersPayantService
  ) { }

  ngOnInit(): void {
    this.client = this.config.data.client;
    this.compteClient = this.config.data.compteClient;
    if (this.compteClient) {
      this.populateForm();
    }



  }

  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.compteClientService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.compteClientService.create(entity));
    }
  };

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICompteClient>>): void {
    result.subscribe(
      (res: HttpResponse<ICompteClient>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: ICompteClient | null): void {
    this.ref.close(response);


  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }
  async populateForm() {

    if (this.compteClient != undefined && this.compteClient != null) {
      let tierspayant: ITierspayant = null;
      tierspayant = await this.tierspayantService.findPromise(
        this.compteClient.tierspayantId
      ).then(data => { return data });

      this.updateForm(this.compteClient, tierspayant);

    }

  }

  updateForm(entity: ICompteClient, tierspayant: ITierspayant): void {
    this.editForm.patchValue({
      id: entity.id,
      taux: entity.taux,
      plafondJournalier: entity.plafondJournalier,
      plafondMensuel: entity.plafondMensuel,
      typeClient: entity.typeClient,
      absolute: entity.absolute,
      numMaticule: entity.numMaticule,
      tierspayantId: tierspayant
    });
  }
  private createFromForm(): ICompteClient {
    return {
      ...new CompteClient(),
      id: this.editForm.get(['id'])!.value,
      taux: this.editForm.get(['taux'])!.value,
      plafondJournalier: this.editForm.get(['plafondJournalier'])!.value,
      plafondMensuel: this.editForm.get(['plafondMensuel'])!.value,
      typeClient: this.editForm.get(['typeClient'])!.value,
      absolute: this.editForm.get(['absolute'])!.value,
      numMaticule: this.editForm.get(['numMaticule'])!.value,
      categorie: CategorieAssurance.RC,
      enbale: true,
      tierspayantId: this.editForm.get(['tierspayantId'])!.value.id,
      clientId: this.client.id

    };
  }
  onTypeClientValueChange(value?: any) {
    if (this.editForm.get(['typeClient'])!.value == 'CARNET') {
      this.editForm.get('taux').setValue(100);
      this.editForm.get('taux').disable();
    } else {
      this.editForm.get('taux').setValue(null);
      this.editForm.get('taux').enable();
    }
  }

  searchTiersPayant(event: any): void {
    this.loadTiersPayants(event.query, this.editForm.get(['typeClient'])!.value);
  }

  loadTiersPayants(search?: string, typeTp?: string): void {
    const pageToLoad: number = 0;
    const query: String = search || '';
    this.tierspayantService.queryByTypeTiersPayantPromise({
      page: 0,
      size: ITEMS_PER_PAGE,
      typeTp: typeTp,
      search: query
    }).then(data => {
      this.tierspayantsSearch = data;
    });
  }
}
