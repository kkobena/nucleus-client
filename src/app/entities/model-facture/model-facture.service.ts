import { Injectable } from '@angular/core';
import { IModelFacture } from 'src/app/model/model-facture.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IModelFacture>;
type EntityArrayResponseType = HttpResponse<IModelFacture[]>;
@Injectable({
  providedIn: 'root'
})
export class ModelFactureService {


  public resourceUrl = SERVER_API_URL + 'api/model-factures';

  constructor(protected http: HttpClient) {}

  create(typeEtiquette: IModelFacture): Observable<EntityResponseType> {
    return this.http.post<IModelFacture>(this.resourceUrl, typeEtiquette, { observe: 'response' });
  }

  update(typeEtiquette: IModelFacture): Observable<EntityResponseType> {
    return this.http.put<IModelFacture>(this.resourceUrl, typeEtiquette, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IModelFacture>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IModelFacture[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
