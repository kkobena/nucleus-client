import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { FournisseurProduit, IFournisseurProduit } from 'src/app/model/fournisseur-produit.model';
import { IFournisseur } from 'src/app/model/fournisseur.model';
import { IProduit } from 'src/app/model/produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { FournisseurService } from '../../fournisseur/fournisseur.service';
import { MagasinService } from '../../magasin/magasin.service';
import { FournisseurProduitService } from './fournisseur-produit.service';

@Component({
  selector: 'app-fournisseur-produit-form',
  templateUrl: './fournisseur-produit-form.component.html',
  styleUrls: ['./fournisseur-produit-form.component.scss']
})
export class FournisseurProduitFormComponent implements OnInit {

  isSaving: boolean = false;
  produit: IProduit;
  fournisseurProduit: IFournisseurProduit;
  fournisseurs: IFournisseur[] = [];

  editForm = this.fb.group({
    id: [],
    codeCip: [null, [Validators.required, Validators.min(8), Validators.max(8)]],
    prixAchat: [null, [Validators.required, Validators.min(1)]],
    prixUni: [null, [Validators.required, Validators.min(1)]],
    principal: [false, [Validators.required]],
    fournisseurId: [null, [Validators.required]]
  });
  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder,
    private messageService: MessageService,
    protected fournisseurProduitService: FournisseurProduitService,
    protected magasinService: MagasinService,
    protected fournisseurService: FournisseurService,

  ) { }

  ngOnInit(): void {
    this.produit = this.config.data.produit;
    this.fournisseurProduit = this.config.data.fournisseurProduit;
    this.populate();
  }
  async populate() {
    if (this.fournisseurProduit != undefined && this.fournisseurProduit != null) {
      let fournisseur = null;
      if (this.fournisseurProduit.fournisseurId != null) {
        fournisseur = await this.fournisseurService.findPromise(
          this.fournisseurProduit.fournisseurId
        ).then(data => { return data });
      }
      this.updateForm(this.fournisseurProduit, fournisseur);
    }
  }
  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.fournisseurProduitService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.fournisseurProduitService.create(entity));
    }
  };

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFournisseurProduit>>): void {
    result.subscribe(
      (res: HttpResponse<IFournisseurProduit>) => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(response: IFournisseurProduit | null): void {
    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }


  updateForm(entity: IFournisseurProduit, fournisseur: IFournisseur): void {
    this.editForm.patchValue({
      id: entity.id,
      prixAchat: entity.prixAchat,
      prixUni: entity.prixUni,
      codeCip: entity.codeCip,
      principal: entity.principal,
      fournisseurId: fournisseur
    });
  }
  private createFromForm(): IFournisseurProduit {
    return {
      ...new FournisseurProduit(),
      id: this.editForm.get(['id'])!.value,
      prixAchat: this.editForm.get(['prixAchat'])!.value,
      prixUni: this.editForm.get(['prixUni'])!.value,
      codeCip: this.editForm.get(['codeCip'])!.value,
      principal: this.editForm.get(['principal'])!.value,
      produitId: this.produit.id,
      fournisseurId: this.editForm.get(['fournisseurId'])!.value.id

    };
  }

  searchFournisseurs(event: any): void {
    const query: String = event.query || '';
    this.fournisseurService.queryPromise({
      page: 0,
      size: ITEMS_PER_PAGE,
      search: query
    }).then(data => {
      this.fournisseurs = data;
    });
  }
}
