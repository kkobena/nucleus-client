import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin, Magasin } from 'src/app/model/magasin.model';
import { MagasinService } from '../magasin.service';

@Component({
  selector: 'app-form-stockage',
  templateUrl: './form-stockage.component.html',
  styleUrls: ['./form-stockage.component.scss']
})
export class FormStockageComponent implements OnInit {
  entity: IMagasin;
  isSaving: boolean = false;
  stockage: IMagasin;
  editForm = this.fb.group({
    id: [],
    nomLong: [null, [Validators.required]]
  });
  constructor(protected entityService: MagasinService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.entity = this.config.data.entity;
    this.stockage = this.config.data.stockage;
    if (this.stockage != null && this.stockage != undefined) {
      this.updateForm(this.stockage);
    }

  }
  private createFromForm(): IMagasin {
    return {
      ...new Magasin(),
      id: this.editForm.get(['id'])!.value,
      nomLong: this.editForm.get(['nomLong'])!.value,
      typeMagasin: this.stockage?.typeMagasin
    };
  }
  private updateForm(entity: IMagasin): void {
    this.editForm.patchValue({
      id: entity.id,
      nomLong: entity.nomLong

    });
  }
  save(): void {
    this.isSaving = true;
    let entity = this.createFromForm();
    entity.magasinId = this.entity.id;
    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.entityService.updateStockage(entity));
    } else {
      this.subscribeToSaveResponse(this.entityService.createStockage(entity));
    }
  };

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMagasin>>): void {
    result.subscribe(
      (res: HttpResponse<IMagasin>) => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(response: IMagasin | null): void {
    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;

  }
  cancel(): void {
    this.ref.destroy();
  }
}
