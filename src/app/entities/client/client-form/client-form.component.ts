import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SelectItem } from 'primeng';
import { Observable } from 'rxjs';
import { IClient, ICompteClient } from 'src/app/model/client.model';
import { TypeTierspayant } from 'src/app/model/enumerations/type-tierspayant.model';
import { ITierspayant } from 'src/app/model/tierspayant.model';
import { CompagnieService } from '../../compagnie/compagnie.service';
import { RemiseService } from '../../remise/remise.service';
import { TiersPayantService } from '../../tiers-payant/tiers-payant.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
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
    { label: 'STANDARD', value: 'STANDARD' },
    { label: 'CARNET', value: 'CARNET' },
    { label: 'ASSURANCE', value: 'ASSURANCE' }
  ];
  tierspayants: SelectItem[];
  compagnies: SelectItem[];
  remises: SelectItem[];
  modaleService: NgbModal;
  entity: IClient;
  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    datNaiss: [],
    sexe: [],
    typeClient: ['STANDARD', [Validators.required]],
    compagnieId: [],
    remiseId: [],
    mail: [],
    mobile: [],
    compteClients: this.fb.array([])



  });
  constructor(private fb: FormBuilder,
    protected tierspayantService: TiersPayantService,
    protected remiseService: RemiseService,
    protected compagniesService: CompagnieService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {
    this.addNewEntity();
    console.log(this.tierspayant);
  }


  addNewEntity(): void {
    this.tierspayants = [];
    this.remises = [];
    this.compagnies = [];
    this.populateAssurrance();
  }
  async populate() {

    let compagniesResponse = await this.compagniesService.queryPromise({ search: '' });
    compagniesResponse.forEach(e => {
      this.compagnies.push({ label: e.libelle, value: e.id });
    });

    let remisesResponse = await this.remiseService.queryPromise({});
    remisesResponse.forEach(e => {
      this.remises.push({ label: e.valeur, value: e.id });
    });


    if (this.entity != undefined && this.entity != null) {
      this.title = "Modification du client " + this.entity.firstName + " " + this.entity.lastName;
      this.updateForm(this.entity);
    }

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
      this.title = "Modification du client " + this.entity.firstName + " " + this.entity.lastName;
      this.updateForm(this.entity);
    }
    else if (this.tierspayant != undefined) {
      this.addCompteClient();
    }
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClient>>): void {
    result.subscribe(
      (res: HttpResponse<IClient>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: IClient | null): void {

    this.activeModal.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    //    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.activeModal.dismiss();
  }
  updateForm(entity: IClient): void {
    this.editForm.patchValue({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      sexe: entity.sexe,
      mail: entity.mail,
      datNaiss: entity.datNaiss,
      typeClient: entity.typeClient,
      compagnieId: entity.compagnieId,
      remiseId: entity.remiseId,
      mobile: entity.mobile,
      compteClients: [entity.compteClients]

    });
  }
  save(): void {
    this.isSaving = true;
    /* const entity = this.createFromForm();
     console.log(entity);
     if (entity.id !== undefined && entity.id !== null) {
       this.subscribeToSaveResponse(this.entityService.update(entity));
     } else {
       this.subscribeToSaveResponse(this.entityService.create(entity));
     }*/
  };
  addCompteClient(typeTierspayant?: string): void {
    let taux = null;
    let tiersPayantId = null;
    let disabled = false;
    if (typeTierspayant!=null && typeTierspayant == this.types[1].value) {
      console.warn(typeTierspayant,this.types[1].value)
      disabled = true;
      taux = 100;

    }
    if (this.tierspayant != undefined) {
      tiersPayantId = this.tierspayant.id;
      this.editForm.get('typeClient').setValue(this.tierspayant.typeTp);
      this.editForm.get('typeClient').disable();
      const carnet = this.tierspayant.typeTp.toString();
      const a=TypeTierspayant[TypeTierspayant.CARNET].toString();
      if (carnet == a) {
        disabled = true;
        taux = 100;
      }
    }


    const compteclient = this.editForm.get('compteClients') as FormArray;
    compteclient.push(this.fb.group({
      taux: [{ value: taux, disabled: disabled }, [Validators.required, Validators.min(1), Validators.max(100)]],
      //  categorie: [],
      tierspayantId: [{ value: tiersPayantId, disabled: tiersPayantId ? true : false }, [Validators.required]],
      numMaticule: [],
      plafondMensuel: [],
      plafondJournalier: [],
      absolute: []

    }));
  }
  onTypeClientValueChange(value: string) {
    const compteclient = this.editForm.get('compteClients') as FormArray;
    while (compteclient.length) {
      compteclient.removeAt(0);
    }
    if (value != this.types[0].value) {
      this.addCompteClient(value);
    }

  }
  validateSize(arr: FormArray) {
    return arr.length > 3 ? {
      invalidSize: true
    } : null;
  }
}
