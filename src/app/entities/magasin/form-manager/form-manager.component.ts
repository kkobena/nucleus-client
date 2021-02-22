import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin, Magasin } from 'src/app/model/magasin.model';
import { IUser } from 'src/app/model/user.model';
import { UserService } from '../../user/user.service';
import { MagasinService } from '../magasin.service';

@Component({
  selector: 'app-form-manager',
  templateUrl: './form-manager.component.html',
  styleUrls: ['./form-manager.component.scss']
})
export class FormManagerComponent implements OnInit {
  entity: IMagasin;
  users?: IUser[] = [];
  isSaving: boolean = false;
  editForm = this.fb.group({
    managerId: [null, [Validators.required]]
  });
  constructor(
    protected entityService: MagasinService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private userService: UserService
   
  ) { }


  ngOnInit(): void {
    this.entity = this.config.data.entity;
    this.populate();

  }
  async populate() {
    this.users = await this.userService.queryPromise({
      magasinId: this.entity.id
    });
    this.updateForm(this.entity);
  }

  private createFromForm(): IMagasin {
    return {
      ...new Magasin(),
      id: this.entity.id,
      managerId: this.editForm.get(['managerId'])!.value.id

    };
  }
  private updateForm(entity: IMagasin): void {
    this.editForm.patchValue({
      managerId: entity.managerId

    });
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    this.subscribeToSaveResponse(this.entityService.updateManager(entity));
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
