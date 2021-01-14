import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { IMagasin } from 'src/app/model/magasin.model';
import { IProduit } from 'src/app/model/produit.model';
import { IRayon } from 'src/app/model/rayon.model';
import { IStockProduit, StockProduit } from 'src/app/model/stock-produit.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { MagasinService } from '../../magasin/magasin.service';
import { RayonService } from '../../rayon/rayon.service';
import { StockProduitService } from '../stock-produit-form/stock-produit.service'
@Component({
  selector: 'app-stock-produit-form',
  templateUrl: './stock-produit-form.component.html',
  styleUrls: ['./stock-produit-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService]
})
export class StockProduitFormComponent implements OnInit {
  isSaving: boolean = false;
  produit: IProduit;
  stockProduit: IStockProduit;
  magasins: SelectItem[] = [];
  selectedMagasin: number;
  rayons: IRayon[];
  editForm = this.fb.group({
    id: [],
    magasinId: [],
    qtyVirtual: [0],
    qtyUG: [0],
    qtyStock: [null, [Validators.required]],
    rayonId: [null, [Validators.required]]
  });
  constructor(
    public ref: DynamicDialogRef, public config: DynamicDialogConfig, private fb: FormBuilder,
    private messageService: MessageService,
    protected stockProduitService: StockProduitService,
    protected magasinService: MagasinService,
    protected raysonService: RayonService,

  ) { }

  ngOnInit(): void {
    this.produit = this.config.data.produit;
    this.stockProduit = this.config.data.stockProduit;
    this.populate();
  }
  async populate() {
    let magasinResponse = await this.magasinService.queryPromise({ search: '' });
    magasinResponse.forEach(e => {
      this.magasins.push({ label: e.nomLong, value: e.id });
    });
    if (this.stockProduit != undefined && this.stockProduit != null) {
      let rayon = null;
      if (this.stockProduit.rayonId != null) {
        rayon = await this.raysonService.findPromise(
          this.stockProduit.rayonId
        ).then(data => { return data });
      }
      this.updateForm(this.stockProduit, rayon);
    }
  }

  save(): void {
    this.isSaving = true;
    const entity = this.createFromForm();
    if (entity.id !== undefined && entity.id !== null) {
      this.subscribeToSaveResponse(this.stockProduitService.update(entity));
    } else {
      this.subscribeToSaveResponse(this.stockProduitService.create(entity));
    }
  };

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockProduit>>): void {
    result.subscribe(
      (res: HttpResponse<IStockProduit>) => this.onSaveTierspayantSuccess(res.body),
      () => this.onSaveError()
    );
  }
  protected onSaveTierspayantSuccess(response: IStockProduit | null): void {
    this.ref.close(response);

  }
  protected onSaveError(): void {
    this.isSaving = false;
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
  }
  cancel(): void {
    this.ref.destroy();
  }


  updateForm(entity: IStockProduit, rayon: IRayon): void {
    this.editForm.patchValue({
      id: entity.id,
      qtyStock: entity.qtyStock,
      rayonId: rayon,
      magasinId: entity.magasinId
    });
  }
  private createFromForm(): IStockProduit {
    return {
      ...new StockProduit(),
      id: this.editForm.get(['id'])!.value,
      qtyStock: this.editForm.get(['qtyStock'])!.value,
      produitId: this.produit.id,
      rayonId: this.editForm.get(['rayonId'])!.value.id,
      qtyVirtual: this.editForm.get(['qtyVirtual'])!.value,
      qtyUG: this.editForm.get(['qtyUG'])!.value,
    };
  }/*
  searchMagasins(event: any): void {
    const pageToLoad: number = 0;
    const query: String = event.query || '';
    this.magasinService.queryPromise({
      page: 0,
      size: ITEMS_PER_PAGE,
      search: query
    }).then(data => {
      this.magasins = data;
    });
  }
*/

  searchRayons(event: any): void {
    const pageToLoad: number = 0;
    const query: String = event.query || '';
    this.raysonService.queryPromise({
      page: 0,
      size: ITEMS_PER_PAGE,
      magasinId: this.editForm.get(['magasinId'])!.value,
      search: query
    }).then(data => {
      this.rayons = data;
    });
  }
}
