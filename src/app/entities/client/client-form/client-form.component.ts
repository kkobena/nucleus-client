import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { from, Observable } from 'rxjs';
import { Client, IClient, ICompteClient } from 'src/app/model/client.model';
import { CategorieAssurance } from 'src/app/model/enumerations/categorie-assurance.model';
import { ITierspayant } from 'src/app/model/tierspayant.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { CompagnieService } from '../../compagnie/compagnie.service';
import { RemiseService } from '../../remise/remise.service';
import { TiersPayantService } from '../../tiers-payant/tiers-payant.service';
import { ClientService } from '../client.service';
import * as moment from 'moment';
import { DAY_MONTH_YEAR, DATE_FORMAT } from 'src/app/shared/constants/input.constants';
@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ClientFormComponent implements OnInit {
  isSaving: boolean = false;
  title: string = 'Ajouter un nouveau client';
  tierspayant: ITierspayant;
  catgories = [
    { label: 'RO', value: 'RO' },
    { label: 'RC1', value: 'RC1' },
    { label: 'RC2', value: 'RC2' },
    { label: 'RC3', value: 'RC3' }
  ];
  types = [
    { label: 'CARNET', value: 'CARNET' },
    { label: 'ASSURANCE', value: 'ASSURANCE' }
  ];
  validSize: boolean = true;
  ayantDroitSize: boolean = true;
  tierspayants: SelectItem[];
  tierspayantsSearch: ITierspayant[];
  compagnies: SelectItem[];
  remises: SelectItem[];
  entity: IClient;
  editForm = this.fb.group({
    id: [],
    compteClientId: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    datNaiss: [],
    sexe: [],
    typeClient: ['ASSURANCE', [Validators.required]],
    tierspayantId: [null, [Validators.required]],
    taux: [null, [Validators.required, Validators.min(10), Validators.max(100)]],
    remiseId: [],
    mail: [],
    mobile: [],
    compagnieId: [],
    numMaticule: [],
    plafondMensuel: [0],
    plafondJournalier: [0],
    absolute: [],
    compteClients: this.fb.array([]),
    ayantDroits: this.fb.array([])
  });
  constructor(private fb: FormBuilder,
    protected tierspayantService: TiersPayantService,
    protected remiseService: RemiseService,
    protected clientService: ClientService,
    protected compagniesService: CompagnieService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.entity = this.config.data.entity;
    this.addNewEntity();
  }


  addNewEntity(): void {
    this.tierspayants = [];
    this.remises = [];
    this.compagnies = [];
    this.populateAssurrance();
  }

  async populateAssurrance() {
    let compagniesResponse = await this.compagniesService.queryPromise({ search: '' });
    compagniesResponse.forEach(e => {
      this.compagnies.push({ label: e.libelle, value: e.id });
    });

    let remisesResponse = await this.remiseService.queryPromise({});
    remisesResponse.forEach(e => {
      this.remises.push({ label: e.valeur, value: e.id });
    });

    if (this.entity != undefined && this.entity != null) {
      let tierspayant = null;
      if (this.entity.compteClient) {
        tierspayant = await this.tierspayantService.findPromise(
          this.entity.compteClient?.tierspayantId
        ).then(data => { return data });
      }
      this.updateForm(this.entity, tierspayant);

    }

  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
    result.subscribe(
      (res: HttpResponse<IClient>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: IClient | null): void {

    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }
  buildCompteClients(compteClients: ICompteClient[]): any[] {
    let newArray = [];
    compteClients.filter(e => e.categorie != CategorieAssurance.RO).forEach(e => {
      this.tierspayantService.findPromise(
        e.tierspayantId
      ).then(data => newArray.push({ taux: e.taux, tierspayantId: data.id, numMaticule: e.numMaticule }));
    });
    return newArray;
  }
  updateForm(entity: IClient, tierspayant?: ITierspayant): void {
    this.editForm.patchValue({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      sexe: entity.sexe,
      mail: entity.mail,
      datNaiss: moment(entity.datNaiss).format(DAY_MONTH_YEAR),
      compagnieId: entity.compagnieId,
      remiseId: entity.remiseId,
      mobile: entity.mobile,
      plafondMensuel: entity.compteClient?.plafondMensuel,
      plafondJournalier: entity.compteClient?.plafondJournalier,
      compteClientId: entity.compteClient?.id,
      tierspayantId: tierspayant,
      typeClient: entity.compteClient?.typeClient,
      taux: entity.compteClient?.taux,
      absolute: entity.compteClient?.absolute,
      compteClients: [this.buildCompteClients(entity.compteClients)],
      ayantDroits: [entity.ayantDroits]

    });
    this.editForm.get(['typeClient']).disable();
    if (this.editForm.get(['typeClient'])!.value == 'CARNET') {

      this.editForm.get('taux').disable();
    }
    this.editForm.get(['typeClient']).disable();
    this.validateSize();
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    console.log(entity);
    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.clientService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.clientService.create(entity));
    }
  };
  private createFromForm(): IClient {
    const tierspayant = this.editForm.get(['tierspayantId'])!.value;
    return {
      ...new Client(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      datNaiss: moment(this.editForm.get(['datNaiss'])!.value, DAY_MONTH_YEAR),
      compagnieId: this.editForm.get(['compagnieId'])!.value,
      remiseId: this.editForm.get(['remiseId'])!.value,
      mobile: this.editForm.get(['mobile'])!.value,
      mail: this.editForm.get(['mail'])!.value,
      compteClient: {
        numMaticule: this.editForm.get(['numMaticule'])!.value,
        plafondMensuel: this.editForm.get(['plafondMensuel'])!.value,
        plafondJournalier: this.editForm.get(['plafondJournalier'])!.value,
        absolute: this.editForm.get(['absolute'])!.value,
        taux: this.editForm.get(['taux'])!.value,
        enbale: true,
        typeClient: this.editForm.get(['typeClient'])!.value,
        tierspayantId: tierspayant?.id,
        encours: 0,
        categorie: CategorieAssurance.RO,
        id: this.editForm.get(['compteClientId'])!.value
      },
      compteClients: this.editForm.get(['compteClients'])!.value.flatMap(e => [{
        taux: e.taux, tierspayantId: e.tierspayantId.id, numMaticule: e.numMaticule,
        typeClient: this.editForm.get(['typeClient'])!.value,
        plafondMensuel: 0,
        encours: 0,
        plafondJournalier: 0,
        categorie: CategorieAssurance.RC,
        absolute: false,
        id: e.id

      }]),
      ayantDroits: this.editForm.get(['ayantDroits'])!.value.flatMap(e => [{
        num: e.num, firstName: e.firstName, lastName: e.lastName,
        sexe: e.sexe,
        mobile: e.mobile,
        datNaiss: moment(e.datNaiss, DAY_MONTH_YEAR)

      }]),
    };
  }

  addAyantDroit(): void {
    const ayantDroits = this.editForm.get('ayantDroits') as FormArray;
    ayantDroits.push(this.fb.group({
      num: [],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      sexe: [],
      datNaiss: [],
      mobile: []
    }));
    this.valideAyantDroitSize();
  }

  addCompteClient(): void {
    const compteclient = this.editForm.get('compteClients') as FormArray;
    compteclient.push(this.fb.group({
      taux: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
      tierspayantId: [null, [Validators.required]],
      numMaticule: [],
      id: []
    }));
    this.validateSize();
  }
  onTypeClientValueChange(value?: any) {
    if (this.editForm.get(['typeClient'])!.value == 'CARNET') {
      this.editForm.get('taux').setValue(100);
      this.editForm.get('taux').disable();
    } else {
      this.editForm.get('taux').setValue(null);
      this.editForm.get('taux').enable();
    }
    const compteclient = this.editForm.get('compteClients') as FormArray;
    while (compteclient.length) {
      compteclient.removeAt(0);
    }
  }
  validateSize(): void {
    const compteclient = this.editForm.get('compteClients') as FormArray;
    this.validSize = compteclient.length < 5;
  }
  removeComptClient(index: number): void {
    const compteclient = this.editForm.get('compteClients') as FormArray;
    compteclient.removeAt(index);
    this.validateSize();
  }
  removeAyantDroit(index: number): void {
    const compteclient = this.editForm.get('ayantDroits') as FormArray;
    compteclient.removeAt(index);
    this.valideAyantDroitSize();
  }
  valideAyantDroitSize(): void {
    const compteclient = this.editForm.get('ayantDroits') as FormArray;
    this.ayantDroitSize = compteclient.length < 1;
  }
  onSelectTiersPayant(event: any): void {
    this.tierspayant = event;

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