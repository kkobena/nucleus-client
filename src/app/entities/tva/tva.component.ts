import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ITva,Tva} from '../../model/tva.model';
import {Subscription, Observable} from 'rxjs';
import {ITEMS_PER_PAGE} from '../../shared/constants/pagination.constants';
import {ConfirmationService} from 'primeng/api';
import {TvaService} from './tva.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
    selector: 'app-tva',
    templateUrl: './tva.component.html',
    styleUrls: ['./tva.component.css'],
 
    encapsulation: ViewEncapsulation.None
})
export class TvaComponent implements OnInit, OnDestroy {
    tvas?: ITva[];
    eventSubscriber?: Subscription;
    totalItems = 0;
    itemsPerPage = ITEMS_PER_PAGE;
    page: number = 0;
    predicate!: string;
    ascending!: boolean;
    selectedTva: ITva;
    loading: boolean;
    isSaving = false;
    displayDialog: boolean;
    editForm = this.fb.group({
        id: [],
        taux: [null, [Validators.required]]
    
      });
    
    constructor(protected tvaService: TvaService,
                protected activatedRoute: ActivatedRoute,
                protected router: Router,
                protected modalService: ConfirmationService
                , private fb: FormBuilder
    ) {


    }

    loadPage(page?: number): void {
       const pageToLoad: number = page || this.page;
        this.loading = true;
        this.tvaService
            .query({
                page: pageToLoad,
                size: this.itemsPerPage
            })
            .subscribe(
                (res: HttpResponse<ITva[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
                () => this.onError()
            );
    }

    lazyLoading(event: LazyLoadEvent): void {
        console.log(event.first / event.rows);
         this.page = event.first / event.rows;
        this.loading = true;
        this.tvaService
            .query({
                page: this.page,
                size: event.rows,
                // sort: this.sort(),
            })
            .subscribe(
                (res: HttpResponse<ITva[]>) => this.onSuccess(res.body, res.headers, this.page),
                () => this.onError()
            );
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(data => {
            this.loadPage();
        });

    }
    ngOnDestroy(): void {
       
    }

    trackId(index: number, item: ITva): number {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        // tslint:disable-next-line:no-non-null-assertion
        return item.id!;
    }

  

    delete(tva: ITva): void {
        this.confirmDelete(tva.id);
    }


    protected onSuccess(data: ITva[] | null, headers: HttpHeaders, page: number): void {
        this.totalItems = Number(headers.get('X-Total-Count'));
        this.page = page;
        this.router.navigate(['parametres/tva'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage

            },
        });
        this.tvas = data || [];
        this.loading = false;
    }

    sort(): string[] {
        const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected onError(): void {
        this.loading = false;
    }

    confirmDelete(id: number): void {
        this.confirmDialog(id);
    }

    confirmDialog(id: number) {
        this.modalService.confirm({
            message: 'Voulez-vous supprimer cet enregistrement ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.tvaService.delete(id).subscribe(() => {
                    this.loadPage(0);
                
                });
            }
        });
    }
    updateForm(tva: ITva): void {
        this.editForm.patchValue({
          id: tva.id,
          taux: tva.taux
    
         
        });
      }
      protected onSaveSuccess(): void {
        this.isSaving = false;
        this.displayDialog=false;
        this.loadPage(0);
       
      }
      protected onSaveError(): void {
        this.isSaving = false;
      }
      protected subscribeToSaveResponse(result: Observable<HttpResponse<ITva>>): void {
        result.subscribe(
          () => this.onSaveSuccess(),
          () => this.onSaveError()
        );
      }
      private createFromForm(): ITva {
        return {
          ...new Tva(),
          id: this.editForm.get(['id'])!.value,
          taux: this.editForm.get(['taux'])!.value
        
        };
      }
      save(): void {
        this.isSaving = true;
        const tva = this.createFromForm();
        console.log(tva);
        if (tva.id !== undefined) {
         
          this.subscribeToSaveResponse(this.tvaService.update(tva));
        } else {
          this.subscribeToSaveResponse(this.tvaService.create(tva));
        }
      }
      cancel(): void {
        this.displayDialog=false;
    }
    addNewEntity():void {
        this.updateForm(new Tva());
        this.displayDialog=true;
    }
    onEdit(tva: ITva):void {
        this.updateForm(tva);
        this.displayDialog=true;
    }
}
