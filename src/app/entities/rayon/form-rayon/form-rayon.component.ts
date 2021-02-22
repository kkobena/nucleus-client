import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin } from 'src/app/model/magasin.model';
import { IRayon, Rayon } from 'src/app/model/rayon.model';
import { RayonService } from '../rayon.service';

@Component({
  selector: 'app-form-rayon',
  templateUrl: './form-rayon.component.html',
  styleUrls: ['./form-rayon.component.scss']
})
export class FormRayonComponent implements OnInit {
  isSaving: boolean = false;
  magasin: IMagasin;
  entity: IRayon;
  editForm = this.fb.group({
    id: [],
    code: [null, [Validators.required]],
    libelle: [null, [Validators.required]]

  });
  constructor(protected entityService: RayonService,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder,
    private messageService: MessageService

  ) { }



  ngOnInit(): void {
    this.magasin = this.config.data.magasin;
    this.entity = this.config.data.entity;
    if (this.entity != undefined && this.entity != null) {
      this.updateForm(this.entity);

    }

  }

  updateForm(entity: IRayon): void {
    this.editForm.patchValue({
      id: entity.id,
      code: entity.code,
      libelle: entity.libelle

    });
  }

  private createFromForm(): IRayon {
    return {
      ...new Rayon(),
      id: this.editForm.get(['id'])!.value,
      code: this.editForm.get(['code'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      magasinId: this.magasin.id

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

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRayon>>): void {
    result.subscribe(
      (res: HttpResponse<IRayon>) => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(response: IRayon | null): void {
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
