import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, LazyLoadEvent, MessageService, MenuItem } from 'primeng';
import { TiersPayantService } from './tiers-payant.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ITEMS_PER_PAGE } from 'src/app/shared/constants/pagination.constants';
import { ITierspayant } from 'src/app/model/tierspayant.model';

@Component({
  selector: 'app-tiers-payant',
  templateUrl: './tiers-payant.component.html',
  styles: [` 
  body .ui-inputtext{
   width: 100% !important;
}
   `],
     providers: [MessageService],
   encapsulation: ViewEncapsulation.None
})
export class TiersPayantComponent implements OnInit {
  entites?: ITierspayant[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage =ITEMS_PER_PAGE;
  page: number = 0;
  selectedEl: ITierspayant;
  loading: boolean;
  isSaving = false;
  displayDialog: boolean;
  fileDialog: boolean;
  items: MenuItem[];
  constructor(protected entityService: TiersPayantService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected modalService: ConfirmationService
    , private fb: FormBuilder,
    private messageService: MessageService
    ) { }
  
  ngOnInit(): void {
    this.items = [
      {label: 'Information tiers-paynt', icon: 'fa fa-fw fa-home'},
      {label: 'Information clients', icon: 'fa fa-user-o'},
      {label: 'Achats', icon:'fa fa-bitcoin'}
   
      
  ];

    this.activatedRoute.data.subscribe(data => {
      this.loadPage();
  });
  }
  protected onSuccess(data: ITierspayant[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['tierspayant/tierspayant'], {
        queryParams: {
            page: this.page,
            size: this.itemsPerPage

        },
    });
    this.entites = data || [];
    this.loading = false;
}
protected onError(): void {
  this.loading = false;
}

loadPage(page?: number,search?:String): void {
  const pageToLoad: number = page || this.page;
  const query:String=search||'';
   this.loading = true;
   this.entityService
       .query({
           page: pageToLoad,
           size: 999999,
         /*   size: this.itemsPerPage, */
           search:query
       })
       .subscribe(
           (res: HttpResponse<ITierspayant[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
           () => this.onError()
       );
}
lazyLoading(event: LazyLoadEvent): void {
   this.page = event.first / event.rows;
  this.loading = true;
  this.entityService
      .query({
          page: this.page,
          size: event.rows
      })
      .subscribe(
          (res: HttpResponse<ITierspayant[]>) => this.onSuccess(res.body, res.headers, this.page),
          () => this.onError()
      );
}
confirmDialog(id: number) {
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
delete(entity: ITierspayant): void {
  this.confirmDelete(entity.id);
}
confirmDelete(id: number): void {
  this.confirmDialog(id);
}
onFilterTable(event:any):void{
  if (event.key === "Enter") {
    this.loadPage(0,event.target.value); 
 
  }

}
showFileDialog():void{
  this.fileDialog=true;
}
onUpload(event) {
  const formData: FormData = new FormData();
  const file = event.files[0];
  formData.append('importcsv', file, file.name);
  this.subscribeToSaveResponse(this.entityService.uploadFile(formData)); 
}
protected subscribeToSaveResponse(result: Observable<HttpResponse<ITierspayant>>): void {
  result.subscribe(
    () => this.onSaveSuccess(),
    () => this.onSaveError()
  );
}
protected onSaveSuccess(): void {
  this.isSaving = false;
  this.displayDialog=false;
  this.fileDialog=false;
  this.loadPage(0);
 
}
protected onSaveError(): void {
  this.isSaving = false;
  this.messageService.add({severity:'error', summary:'Erreur', detail:'Enregistrement a échoué'});
}
cancel(): void {
  this.displayDialog=false;
  this.fileDialog=false;
}
onEdit(entity: ITierspayant):void {
  this.displayDialog=true;
}
addNewEntity():void {
  this.displayDialog=true;
}
search(event:any):void {
  console.log(event);
  this.loadPage(0,event.query); 
}
onSelect(event:any):void{

this.selectedEl=event;
}
}
