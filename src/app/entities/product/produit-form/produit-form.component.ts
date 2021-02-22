import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { TypeMagasin } from 'src/app/model/enumerations/type-magasin.model';
import { FournisseurProduit } from 'src/app/model/fournisseur-produit.model';
import { IProduit, Produit } from 'src/app/model/produit.model';
import { StockProduit } from 'src/app/model/stock-produit.model';
import { DetailService } from '../../detail/detail.service';
import { FamilleProduitService } from '../../famille-produit/famille-produit.service';
import { FormeProduitService } from '../../forme-produit/forme-produit.service';
import { FournisseurService } from '../../fournisseur/fournisseur.service';
import { GammeProduitService } from '../../gamme-produit/gamme-produit.service';
import { LaboratoireProduitService } from '../../laboratoire-produit/laboratoire-produit.service';
import { MagasinService } from '../../magasin/magasin.service';
import { RayonService } from '../../rayon/rayon.service';
import { TvaService } from '../../tva/tva.service';
import { TypeEtiquetteService } from '../../type-etiquette/type-etiquette.service';
import { ProduitService } from '../produit.service';

@Component({
  selector: 'app-produit-form',
  templateUrl: './produit-form.component.html',
  styleUrls: ['./produit-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProduitFormComponent implements OnInit {
  produit: IProduit;
  isSaving: boolean = false;
  isDeconditionnable: boolean = false;
  isDatePeremptionChecked: boolean = false;
  etiquettes: SelectItem[] = [];
  formeProduits: SelectItem[] = [];
  familleProduits: SelectItem[] = [];
  laboratoires: SelectItem[] = [];
  gammes: SelectItem[] = [];
  tvas: SelectItem[] = [];
  fournisseurs: SelectItem[] = [];
  rayons: SelectItem[] = [];
  remisesProduits: SelectItem[] = [];
  editForm = this.fb.group({
    id: [],
    libelle: [null, [Validators.required]],
    qtyAppro: [0, [Validators.required]],
    qtySeuilMini: [0, [Validators.required]],
    dateperemption: [false],
    codeCip: [null, [Validators.required, Validators.min(6)]],
    codeEan: [],
    deconditionnable: [false, [Validators.required]],
    prixPaf: [null, [Validators.required, Validators.min(1)]],
    prixUni: [null, [Validators.required, Validators.min(1)]],
    qtyDetails: [0],
    perimeAt: [],
    tvaId: [null, [Validators.required]],
    familleId: [null, [Validators.required]],
    typeEtyquetteId: [null, [Validators.required]],
    gammeId: [],
    formeId: [],
    laboratoireId: [],
    fournisseurId: [null, [Validators.required]],
    rayonId: [null, [Validators.required]],
    fournisseurProduitId: [],
    stockProduitId: [],
    remiseId: []

  });
  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder,
    private messageService: MessageService,
    protected produitService: ProduitService,
    protected magasinService: MagasinService,
    protected rayonService: RayonService,
    protected laboratoireService: LaboratoireProduitService,
    protected formeProduitService: FormeProduitService,
    protected fournisseurService: FournisseurService,
    protected familleService: FamilleProduitService,
    protected gammeProduitService: GammeProduitService,
    protected tvaService: TvaService,
    protected typeEtiquetteService: TypeEtiquetteService,
    protected entityService: DetailService,
  ) { }

  ngOnInit(): void {
    this.produit = this.config.data.produit;
    this.populate();
  }
  async populate() {
    let typeEtiquetteResponse = await this.typeEtiquetteService.queryPromise({ search: '' });
    typeEtiquetteResponse.forEach(e => {
      this.etiquettes.push({ label: e.libelle, value: e.id });
    });
    let tvaResponse = await this.tvaService.queryPromise({ search: '' });
    tvaResponse.forEach(e => {
      this.tvas.push({ label: e.tva, value: e.id });
    });
    let formeProduitsResponse = await this.formeProduitService.queryPromise({ search: '' });
    formeProduitsResponse.forEach(e => {
      this.formeProduits.push({ label: e.libelle, value: e.id });
    });
    let fournisseursResponse = await this.fournisseurService.queryPromise({ search: '' });
    fournisseursResponse.forEach(e => {
      this.fournisseurs.push({ label: e.libelle, value: e.id });
    });
    let laboratoiresResponse = await this.laboratoireService.queryPromise({ search: '' });
    laboratoiresResponse.forEach(e => {
      this.laboratoires.push({ label: e.libelle, value: e.id });
    });
    let gammesResponse = await this.gammeProduitService.queryPromise({ search: '' });
    gammesResponse.forEach(e => {
      this.gammes.push({ label: e.libelle, value: e.id });
    });
    let familleProduitsResponse = await this.familleService.queryPromise({ search: '' });
    familleProduitsResponse.forEach(e => {
      this.familleProduits.push({ label: e.libelle, value: e.id });
    });
    let rayonsResponse = await this.rayonService.queryPromise({ search: '' });
    rayonsResponse.forEach(e => {
      this.rayons.push({ label: e.libelle, value: e.id });
    });


    if (this.produit != undefined && this.produit != null) {
      this.updateForm(this.produit);
    }
  }

  updateForm(entity: IProduit): void {
    this.editForm.patchValue({
      id: entity.id,
      libelle: entity.libelle,
      rayonId: entity.stockProduit?.rayonId,
      qtyAppro: entity.qtyAppro,
      qtySeuilMini: entity.qtySeuilMini,
      dateperemption: entity.dateperemption,
      perimeAt: entity.perimeAt,
      codeCip: entity.fournisseurProduit?.codeCip,
      fournisseurId: entity.fournisseurProduit?.fournisseurId,
      codeEan: entity.codeEan,
      deconditionnable: entity.deconditionnable,
      prixPaf: entity.prixPaf,
      prixUni: entity.prixUni,
      qtyDetails: entity.qtyDetails,
      tvaId: entity.tvaId,
      familleId: entity.familleId,
      typeEtyquetteId: entity.typeEtyquetteId,
      gammeId: entity.gammeId,
      formeId: entity.formeId,
      laboratoireId: entity.laboratoireId,
      remiseId: entity.remiseId
    });
  }
  private createFromForm(): IProduit {
    return {
      ...new Produit(),
      id: this.editForm.get(['id'])!.value,
      fournisseurProduit: new FournisseurProduit(
        this.editForm.get(['fournisseurProduitId'])!.value,
        this.editForm.get(['prixPaf'])!.value,
        this.editForm.get(['prixUni'])!.value,
        this.editForm.get(['codeCip'])!.value,
        null,
        null,
        null,
        this.editForm.get(['fournisseurId'])!.value,
        true,
      ),
      perimeAt: this.editForm.get(['perimeAt'])!.value,
      qtyAppro: this.editForm.get(['qtyAppro'])!.value,
      qtySeuilMini: this.editForm.get(['qtySeuilMini'])!.value,
      dateperemption: this.editForm.get(['dateperemption'])!.value,
      remiseId: this.editForm.get(['remiseId'])!.value,
      codeCip: this.editForm.get(['codeCip'])!.value,
      codeEan: this.editForm.get(['codeEan'])!.value,
      deconditionnable: this.editForm.get(['deconditionnable'])!.value,
      prixPaf: this.editForm.get(['prixPaf'])!.value,
      prixUni: this.editForm.get(['prixUni'])!.value,
      qtyDetails: this.editForm.get(['qtyDetails'])!.value,
      tvaId: this.editForm.get(['tvaId'])!.value,
      familleId: this.editForm.get(['familleId'])!.value,
      typeEtyquetteId: this.editForm.get(['typeEtyquetteId'])!.value,
      gammeId: this.editForm.get(['gammeId'])!.value,
      formeId: this.editForm.get(['formeId'])!.value,
      laboratoireId: this.editForm.get(['laboratoireId'])!.value,
      libelle: this.editForm.get(['libelle'])!.value,
      stockProduit: new StockProduit(
        this.editForm.get(['stockProduitId'])!.value,
        0,
        0,
        0,
        null,
        null,
        null,
        this.editForm.get(['rayonId'])!.value,
        null,
        null,
        null,
        TypeMagasin.PRINCIPAL
      )
    };
  }



  save(): void {

    this.isSaving = true;
    const entity = this.createFromForm();
    if (entity.prixPaf > entity.prixUni) {
      this.isSaving = false;
      this.messageService.add({ severity: 'warning', summary: 'Formulaire invalide', detail: "Le prix d'achat ne doit pas être supérieur au prix de vente" });
    } else {
      if (entity.id !== undefined && entity.id !== null) {
        this.subscribeToSaveResponse(this.entityService.update(entity));
      } else {
        this.subscribeToSaveResponse(this.entityService.create(entity));
      }
    }

  };

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduit>>): void {
    result.subscribe(
      (res: HttpResponse<IProduit>) => this.onSaveSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveSuccess(response: IProduit | null): void {
    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }
  onDeconditionnable(value: any): void {
    this.isDeconditionnable = value.checked;
    if (this.isDeconditionnable) {
      this.editForm.get('qtyDetails').setValidators([Validators.required, Validators.min(1)]);
      this.editForm.get('qtyDetails').updateValueAndValidity();
    } else {
      this.editForm.get('qtyDetails').clearValidators();
      this.editForm.get('qtyDetails').updateValueAndValidity();
    }
  }
  onDatePeremtionCheck(value: any): void {
    this.isDatePeremptionChecked = value.checked;

  }
}
