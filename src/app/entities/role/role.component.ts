import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { Authority, IAuthority } from 'src/app/model/authority.model';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { AuthorityService } from './authority.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [MessageService, DialogService],
  encapsulation: ViewEncapsulation.None
})
export class RoleComponent implements OnInit {

  entities?: IAuthority[];
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page: number = 0;
  predicate!: string;
  ascending!: boolean;
  selected: IAuthority;
  loading: boolean;
  isSaving = false;
  editable = false;
  displayDialog: boolean;
  editForm = this.fb.group({
    name: [null, [Validators.required]],
    libelle: [null, [Validators.required]]

  });

  constructor(protected entityService: AuthorityService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    private messageService: MessageService,
    protected modalService: ConfirmationService
    , private fb: FormBuilder
  ) {


  }

  loadPage(page?: number, search?: String): void {
    const pageToLoad: number = page || this.page;
    const query: String = search || '';
    this.loading = true;
    this.entityService
      .query({
        page: pageToLoad,
        search: query,
        size: this.itemsPerPage
      })
      .subscribe(
        (res: HttpResponse<IAuthority[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  lazyLoading(event: LazyLoadEvent): void {
    console.log(event.first / event.rows);
    this.page = event.first / event.rows;
    this.loading = true;
    this.entityService
      .query({
        page: this.page,
        size: event.rows,
        // sort: this.sort(),
      })
      .subscribe(
        (res: HttpResponse<IAuthority[]>) => this.onSuccess(res.body, res.headers, this.page),
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

  delete(authority: IAuthority): void {
    this.confirmDelete(authority.name);
  }


  protected onSuccess(data: IAuthority[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['admin/authority'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage

      },
    });
    this.entities = data || [];
    this.loading = false;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'name') {
      result.push('name');
    }
    return result;
  }

  protected onError(): void {
    this.loading = false;
  }

  confirmDelete(name: string): void {
    this.confirmDialog(name);
  }

  confirmDialog(id: string) {
    this.modalService.confirm({
      message: 'Voulez-vous supprimer cet enregistrement ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entityService.delete(id).subscribe(() => {
          this.loadPage(0);

        });
      }
    });
  }
  updateForm(authority: IAuthority): void {
    this.editForm.patchValue({
      name: authority.name,
      libelle: authority.libelle
    });
  }
  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.displayDialog = false;
    this.loadPage(0);

  }
  protected onSaveError(): void {
    this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Enregistrement a échoué' });
    this.isSaving = false;
  }
  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAuthority>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }
  private createFromForm(): IAuthority {
    return {
      ...new Authority(),
      name: this.editForm.get(['name'])!.value,
      libelle: this.editForm.get(['libelle'])!.value

    };
  }
  save(): void {
    this.isSaving = true;
    const authority = this.createFromForm();
    if (authority.name !== undefined) {

      this.subscribeToSaveResponse(this.entityService.update(authority));
    } else {
      this.subscribeToSaveResponse(this.entityService.create(authority));
    }
  }
  cancel(): void {
    this.displayDialog = false;
  }
  addNewEntity(): void {
    this.editForm.get(['name']).enable();
    this.updateForm(new Authority());
    this.displayDialog = true;
  }
  onEdit(authority: IAuthority): void {
    this.editForm.get(['name']).disable();
    this.updateForm(authority);
    this.displayDialog = true;
  }
  search(event: any): void {
    this.loadPage(0, event.target.value);
  }
}