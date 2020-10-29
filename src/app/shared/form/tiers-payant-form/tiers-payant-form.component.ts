import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng';
import { Observable } from 'rxjs';
import { GroupeTierspayantService } from 'src/app/entities/groupe-tierspayant/groupe-tierspayant.service';
import { ModelFactureService } from 'src/app/entities/model-facture/model-facture.service';
import { RisqueService } from 'src/app/entities/remise/risque.service';
import { TiersPayantService } from 'src/app/entities/tiers-payant/tiers-payant.service';
import { IGroupeTierspayant } from 'src/app/model/groupe-tierspayant.model';
import { ITierspayant, Tierspayant } from 'src/app/model/tierspayant.model';

@Component({
  selector: 'app-tiers-payant-form',
  templateUrl: './tiers-payant-form.component.html',
  styleUrls: ['./tiers-payant-form.component.css']
})
export class TiersPayantFormComponent implements OnInit, OnChanges {
  groupeTierspayants: IGroupeTierspayant[] = [];
  groupes: SelectItem[];
  entites?: ITierspayant[];
  responseDialog: boolean;
  risques: SelectItem[];
  modelFactures: SelectItem[];
  @Input("tiersPayant")
  tiersPayant: ITierspayant;
  @Input("displayDialog")
  displayDialog: Boolean
  @Input("isSaving")
  isSaving: Boolean
  types = [{ label: 'ASSURANCE', value: 'ASSURANCE' }, { label: 'CARNET', value: 'CARNET' }];
  editForm = this.fb.group({
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
    address: []

  });


  constructor(private fb: FormBuilder,
    protected entityService: TiersPayantService,
    protected tierspayantService: TiersPayantService,
    protected groupetierspayantService: GroupeTierspayantService,
    protected risqueService: RisqueService,
    protected modelFactureService: ModelFactureService,
  ) {

  }

  ngOnInit(): void {

    console.log(this.tiersPayant);
    // this.updateForm(this.tiersPayant);
    //addNewEntity
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
  onEdit(): void {
    this.updateForm(this.tiersPayant);

  }
  ngOnChanges(changes: { [property: string]: SimpleChange }) {
    let change = changes["tiersPayant"];
    console.log(change,changes)
    if (change.currentValue != this.tiersPayant) {
    //  this.tiersPayant = changes["tiersPayant"].currentValue || null;
    }

  }
  addNewEntity(): void {
    this.groupes = [];
    this.risques = [];
    this.modelFactures = [];
    //this.initialyseForm();

    this.populate();

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
  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITierspayant>>): void {
    result.subscribe(
      (res: HttpResponse<ITierspayant>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: ITierspayant | null): void {

    // this.selectedEl = response;
    this.displayDialog = false;
    this.isSaving = false;
  }
  protected onSaveError(): void {
    this.isSaving = false;
    //    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.displayDialog = false;

  }
}
