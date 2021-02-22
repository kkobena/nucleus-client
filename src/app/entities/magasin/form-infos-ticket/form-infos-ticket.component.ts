import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin, Magasin } from 'src/app/model/magasin.model';
import { MagasinService } from '../magasin.service';

@Component({
  selector: 'app-form-infos-ticket',
  templateUrl: './form-infos-ticket.component.html',
  styleUrls: ['./form-infos-ticket.component.scss']
})
export class FormInfosTicketComponent implements OnInit {
  entity: IMagasin;
  isSaving: boolean = false;
  editForm = this.fb.group({
    autreCommentaire: [],
    entete: [],
    commentaire: []
  });
  constructor(
    protected entityService: MagasinService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.entity = this.config.data.entity;
    this.updateForm(this.entity);
  }
  private createFromForm(): IMagasin {
    return {
      ...new Magasin(),
      id: this.entity.id,
      autreCommentaire: this.editForm.get(['autreCommentaire'])!.value,
      entete: this.editForm.get(['entete'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value
    };
  }
  private updateForm(entity: IMagasin): void {
    this.editForm.patchValue({
      entete: entity.entete,
      autreCommentaire: entity.autreCommentaire,
      commentaire: entity.commentaire

    });
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    this.subscribeToSaveResponse(this.entityService.updateInfoTicket(entity));
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
