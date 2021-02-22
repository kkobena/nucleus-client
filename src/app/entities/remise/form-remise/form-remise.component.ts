import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IRemise, Remise } from 'src/app/model/remise.model';
import { RemiseService } from '../remise.service';

@Component({
  selector: 'app-form-remise',
  templateUrl: './form-remise.component.html',
  styleUrls: ['./form-remise.component.scss']
})
export class FormRemiseComponent implements OnInit {
  isSaving: boolean = false;
  remise: IRemise;
  typeRemises: SelectItem[] = [{ label: 'Remise client', value: 'RC' },
  { label: 'Remise produit', value: 'RP' }
  ];
  editForm = this.fb.group({
    id: [],
    valeur: [null],
    remiseValue: [null, [Validators.required]],
    typeRemise: [null, [Validators.required]]
  });

  constructor(protected entityService: RemiseService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder,
    private messageService: MessageService,

  ) { }

  ngOnInit(): void {
    this.remise = this.config.data.remise;
    if (this.remise != null && this.remise != undefined) {
      this.updateForm(this.remise);
    }
  }
  private updateForm(entity: IRemise): void {
    this.editForm.patchValue({
      id: entity.id,
      valeur: entity.valeur,
      typeRemise: entity.typeRemise,
      remiseValue: entity.remiseValue
    });
  }
  private createFromForm(): IRemise {
    return {
      ...new Remise(),
      id: this.editForm.get(['id'])!.value,
      valeur: this.editForm.get(['valeur'])!.value,
      remiseValue: this.editForm.get(['remiseValue'])!.value,
      typeRemise: this.editForm.get(['typeRemise'])!.value

    };
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.entityService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.entityService.create(entity));
    }
  };

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRemise>>): void {
    result.subscribe(
      (res: HttpResponse<IRemise>) => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(response: IRemise | null): void {
    this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Enregistrement effectué avec succès' });
    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }
}
