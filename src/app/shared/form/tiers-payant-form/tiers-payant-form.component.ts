import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { GroupeTierspayantService } from 'src/app/entities/groupe-tierspayant/groupe-tierspayant.service';
import { ModelFactureService } from 'src/app/entities/model-facture/model-facture.service';
import { RisqueService } from 'src/app/entities/remise/risque.service';
import { TiersPayantService } from 'src/app/entities/tiers-payant/tiers-payant.service';
import { IGroupeTierspayant } from 'src/app/model/groupe-tierspayant.model';
import { ITierspayant, Tierspayant } from 'src/app/model/tierspayant.model';

@Component({
  selector: 'app-tiers-payant-form',
  styles: [` 
 
.nucleuschecbox {
    margin-top: 25px !important;
}
   `],
  templateUrl: './tiers-payant-form.component.html',
  encapsulation: ViewEncapsulation.None
})
export class TiersPayantFormComponent implements OnInit {
  groupeTierspayants: IGroupeTierspayant[] = [];
  groupes: SelectItem[];
  risques: SelectItem[];
  modelFactures: SelectItem[];
  title: string = 'Ajouter un tiers-payant';
  tiersPayant: ITierspayant;
  isSaving: boolean = false;
  /* @Output("passEntity")
   passEntity = new EventEmitter<ITierspayant>();
 */
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
    protected groupetierspayantService: GroupeTierspayantService,
    protected risqueService: RisqueService,
    protected modelFactureService: ModelFactureService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig
  ) {

  }

  ngOnInit(): void {
    this.tiersPayant = this.config.data.tiersPayant,
      this.addNewEntity();

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

  addNewEntity(): void {
    this.groupes = [];
    this.risques = [];
    this.modelFactures = [];
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


    if (this.tiersPayant != undefined && this.tiersPayant != null) {
      this.title = "Modification du tiers-payant " + this.tiersPayant.libelLong;
      this.updateForm(this.tiersPayant);
    }
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITierspayant>>): void {
    result.subscribe(
      (res: HttpResponse<ITierspayant>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: ITierspayant | null): void {
    this.ref.close(response);


  }
  protected onSaveError(): void {
    this.isSaving = false;
    //    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }

}
