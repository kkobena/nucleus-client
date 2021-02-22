import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { AyantDroit, IAyantDroit } from 'src/app/model/ayant-droit.model';
import { IClient } from 'src/app/model/client.model';
import { AyantDroitService } from '../ayant-droit.service';
import * as moment from 'moment';
import { DAY_MONTH_YEAR } from 'src/app/shared/constants/input.constants';
@Component({
  selector: 'app-ayant-droit-form',
  templateUrl: './ayant-droit-form.component.html',
  styleUrls: ['./ayant-droit-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class AyantDroitFormComponent implements OnInit {

  isSaving: boolean = false;
  client: IClient;
  ayantDroit: IAyantDroit;


  editForm = this.fb.group({
    id: [],
    num: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    mobile: [],
    sexe: [],
    datNaiss: []

  });
  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder,
    protected ayantDroitService: AyantDroitService, private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.client = this.config.data.client;
    this.ayantDroit = this.config.data.ayantDroit;
    this.updateForm(this.ayantDroit);
  }

  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();

    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.ayantDroitService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.ayantDroitService.create(entity));
    }
  };

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAyantDroit>>): void {
    result.subscribe(
      (res: HttpResponse<IAyantDroit>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: IAyantDroit | null): void {
    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }


  updateForm(entity: IAyantDroit): void {
    this.editForm.patchValue({
      id: entity.id,
      num: entity.num,
      firstName: entity.firstName,
      lastName: entity.lastName,
      mobile: entity.mobile,
      sexe: entity.sexe,
      datNaiss: moment(entity.datNaiss).format(DAY_MONTH_YEAR),
    });
  }
  private createFromForm(): IAyantDroit {
    return {
      ...new AyantDroit(),
      id: this.editForm.get(['id'])!.value,
      datNaiss: moment(this.editForm.get(['datNaiss'])!.value, DAY_MONTH_YEAR),
      num: this.editForm.get(['num'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      mobile: this.editForm.get(['mobile'])!.value,
      sexe: this.editForm.get(['sexe'])!.value,
      assureId: this.client.id

    };
  }



}



