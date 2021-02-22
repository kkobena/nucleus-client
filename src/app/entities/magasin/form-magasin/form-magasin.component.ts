import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { TypeMagasin } from 'src/app/model/enumerations/type-magasin.model';
import { IMagasin, Magasin } from 'src/app/model/magasin.model';
import { IUser } from 'src/app/model/user.model';
import { UserService } from '../../user/user.service';
import { MagasinService } from '../magasin.service';
import { PRINCIPAL } from 'src/app/shared/constants/pagination.constants';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'app-form-magasin',
  templateUrl: './form-magasin.component.html',
  styleUrls: ['./form-magasin.component.scss']
})
export class FormMagasinComponent implements OnInit {
  entity: IMagasin;
  isSaving: boolean = false;
  showTypeMagasinInput: boolean = true;
  typeMagasins: SelectItem[] = [];
  users?: IUser[] = [];
  editForm = this.fb.group({
    id: [],
    magasinId: [],
    managerId: [],
    phone: [],
    mobile: [],
    registreCommerce: [],
    addressePostal: [],
    compteContribuable: [],
    registreImposition: [],
    numComptable: [],
    centreImposition: [],
    entete: [],
    autreCommentaire: [],
    commentaire: [],
    typeMagasin: [null, [Validators.required]],
    nomLong: [null, [Validators.required]],
    autonome: []

  });
  constructor(
    protected entityService: MagasinService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.typeMagasins = [

      /*  { label: 'Stockage principal', value: 'PRINCIPAL' }, */
      { label: 'Dépôt', value: 'DEPOT' },
      { label: 'Dépôt agréé', value: 'DEPOT_AGREE' }
    ];
    this.entity = this.config.data.entity;
    console.log(this.entity);
    this.populate();
    if (this.entity != null && this.entity != undefined) {
      if (this.entity.typeMagasin == "PRINCIPAL") {

        this.editForm.get(['typeMagasin']).disable();
        this.editForm.get('typeMagasin').clearValidators();
        this.editForm.get('typeMagasin').updateValueAndValidity();
        this.showTypeMagasinInput = false;
      }
      this.updateForm(this.entity);
    }

  }
  async populate() {
    this.users = await this.userService.queryPromise();

  }



  private createFromForm(): IMagasin {
    const isAutonome = this.entity.id == PRINCIPAL;
    console.log(isAutonome);
    return {
      ...new Magasin(),
      id: this.editForm.get(['id'])!.value,
      nomLong: this.editForm.get(['nomLong'])!.value,
      magasinId: this.editForm.get(['magasinId'])!.value,
      managerId: this.editForm.get(['managerId'])!.value,
      phone: this.editForm.get(['phone'])!.value,
      mobile: this.editForm.get(['mobile'])!.value,
      registreCommerce: this.editForm.get(['registreCommerce'])!.value,
      addressePostal: this.editForm.get(['addressePostal'])!.value,
      compteContribuable: this.editForm.get(['compteContribuable'])!.value,
      registreImposition: this.editForm.get(['registreImposition'])!.value,
      numComptable: this.editForm.get(['numComptable'])!.value,
      centreImposition: this.editForm.get(['centreImposition'])!.value,
      entete: this.editForm.get(['entete'])!.value,
      commentaire: this.editForm.get(['commentaire'])!.value,
      autreCommentaire: this.editForm.get(['autreCommentaire'])!.value,
      autonome: isAutonome ? isAutonome : this.editForm.get(['autonome'])!.value,
      typeMagasin: this.editForm.get(['typeMagasin'])!.value
    };
  }
  private updateForm(entity: IMagasin): void {
    this.editForm.patchValue({
      id: entity.id,
      typeMagasin: entity.typeMagasin,
      nomLong: entity.nomLong,
      addressePostal: entity.addressePostal,
      phone: entity.phone,
      mobile: entity.mobile,
      commentaire: entity.commentaire,
      autreCommentaire: entity.autreCommentaire,
      entete: entity.entete,
      compteContribuable: entity.compteContribuable,
      registreCommerce: entity.registreCommerce,
      registreImposition: entity.registreImposition,
      centreImposition: entity.centreImposition,
      numComptable: entity.numComptable,
      magasinId: entity.magasinId,
      managerId: entity.managerId,
      autonome: entity.autonome
    });
  }
  save(): void {
    this.isSaving = true;
    let entity = this.createFromForm();
    if (entity.id !== undefined && entity.id !== null) {
      if (entity.id == 1) {
        entity.typeMagasin = TypeMagasin.PRINCIPAL;
      }
      this.subscribeToSaveResponse(this.entityService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.entityService.create(entity));
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
