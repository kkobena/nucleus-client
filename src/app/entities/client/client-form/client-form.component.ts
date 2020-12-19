import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Client, CompteClient, IClient, ICompteClient } from 'src/app/model/client.model';
import { CategorieAssurance } from 'src/app/model/enumerations/categorie-assurance.model';
import { TypeClient } from 'src/app/model/enumerations/type-client.model';
import { TypeTierspayant } from 'src/app/model/enumerations/type-tierspayant.model';
import { ITierspayant } from 'src/app/model/tierspayant.model';
import { CompagnieService } from '../../compagnie/compagnie.service';
import { RemiseService } from '../../remise/remise.service';
import { TiersPayantService } from '../../tiers-payant/tiers-payant.service';

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
  compagnies: SelectItem[];
  remises: SelectItem[];
  entity: IClient;
  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    datNaiss: [],
    sexe: [],
    typeClient: ['ASSURANCE', [Validators.required]],
    tierspayantId: [],
    taux: [],
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
    protected compagniesService: CompagnieService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    this.entity = this.config.data.entity,
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

    let response = await this.tierspayantService.queryPromise({
      search: ''
    });
    response.forEach(item => {
      this.tierspayants.push({ label: item.libelLong, value: item.id });

    });
    if (this.entity != undefined && this.entity != null) {
      /*  const carnet = this.entity.compteClient.typeClient.toString();
        const a = TypeClient[TypeClient.CARNET].toString();*/

      this.updateForm(this.entity);

    }

    //   this.addCompteClient();

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
    //    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }
  updateForm(entity: IClient): void {
    this.editForm.patchValue({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      sexe: entity.sexe,
      mail: entity.mail,
      datNaiss: entity.datNaiss,
      compagnieId: entity.compagnieId,
      remiseId: entity.remiseId,
      mobile: entity.mobile,
      plafondMensuel: entity.compteClient.plafondMensuel,
      plafondJournalier: entity.compteClient.plafondJournalier,
      tierspayantId: entity.compteClient.tierspayantId,
      taux: entity.compteClient.taux,
      absolute: entity.compteClient.absolute,
      compteClients: [entity.compteClients],
      ayantDroits: [entity.ayantDroits]

    });
    this.validateSize();
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    console.warn(entity);

    /*
     console.log(entity);
     if (entity.id !== undefined && entity.id !== null) {
       this.subscribeToSaveResponse(this.entityService.update(entity));
     } else {
       this.subscribeToSaveResponse(this.entityService.create(entity));
     }*/
  };
  private createFromForm(): IClient {
    return {
      ...new Client(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      datNaiss: this.editForm.get(['datNaiss'])!.value,
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
        tierspayantId: this.editForm.get(['tierspayantId'])!.value,
        encours: 0,
        categorie: CategorieAssurance.RO
      },
      compteClients: this.editForm.get(['compteClients'])!.value,
      ayantDroits: this.editForm.get(['ayantDroits'])!.value
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
      numMaticule: []
    }));
    this.validateSize();
  }
  onTypeClientValueChange(value: string) {
    const compteclient = this.editForm.get('compteClients') as FormArray;
    while (compteclient.length) {
      compteclient.removeAt(0);
    }
    //  this.addCompteClient(value);
  }
  validateSize(): void {
    const compteclient = this.editForm.get('compteClients') as FormArray;
    this.validSize = compteclient.length < 3;
  }
  removeComptClient(index: number): void {
    const compteclient = this.editForm.get('compteClients') as FormArray;

    compteclient.removeAt(index);

    this.validateSize();
  }

  valideAyantDroitSize(): void {
    const compteclient = this.editForm.get('ayantDroits') as FormArray;
    this.ayantDroitSize = compteclient.length < 1;
  }
}
