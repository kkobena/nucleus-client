import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IMagasin } from 'src/app/model/magasin.model';
import { IUser, User } from 'src/app/model/user.model';
import { AuthorityService } from '../../role/authority.service';
import { UserService } from '../user.service';
import { IAuthority } from 'src/app/model/authority.model';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [MessageService],
})
export class UserFormComponent implements OnInit {
  entity?: IUser;
  magasin?: IMagasin;
  isSaving: boolean = false;
  roles: IAuthority[] = [];
  editForm = this.fb.group({
    id: [],
    login: [null, [Validators.required]],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    role: [null, [Validators.required]]
  });
  constructor(
    protected entityService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private messageService: MessageService,
    private auth: AuthorityService
  ) { }

  ngOnInit(): void {
    this.entity = this.config.data.entity;
    this.magasin = this.config.data.magasin;
    this.populate();
   
  }
  async populate() {
    this.roles = await this.auth.queryPromise();
    if (this.entity != null) {
      this.updateForm(this.entity);
    }
  }
  private updateForm(entity: IUser): void {
    this.editForm.patchValue({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      login: entity.login,
      role: this.roles.filter(e => e.name === entity.role)[0]
    });
  }
  private createFromForm(): IUser {
    return {
      ...new User(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      magasinId: this.magasin.id,
      lastName: this.editForm.get(['lastName'])!.value,
      login: this.editForm.get(['login'])!.value,
      role: this.editForm.get(['role'])!.value.name

    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUser>>): void {
    result.subscribe(
      (res: HttpResponse<IUser>) => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(response: IUser | null): void {
    this.messageService.add({ severity: 'info', summary: 'Information', detail: 'Opération effectuée avec succès' });
    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Opération a échouée ' });
    this.isSaving = false;

  }
  cancel(): void {
    this.ref.destroy();
  }

  save(): void {
    this.isSaving = true;
    let entity = this.createFromForm();
    if (entity.id !== undefined && entity.id !== null) {

      this.subscribeToSaveResponse(this.entityService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.entityService.create(entity));
    }
  }
}
