import { Injectable } from '@angular/core';
import { IFamilleProduit } from 'src/app/model/famille-produit.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IFamilleProduit>;
type EntityArrayResponseType = HttpResponse<IFamilleProduit[]>;
@Injectable({
  providedIn: 'root'
})
export class FamilleProduitService {

  public resourceUrl = SERVER_API_URL + 'api/famille-produits';

  constructor(protected http: HttpClient) {}

  create(familleProduit: IFamilleProduit): Observable<EntityResponseType> {
    return this.http.post<IFamilleProduit>(this.resourceUrl, familleProduit, { observe: 'response' });
  }

  update(familleProduit: IFamilleProduit): Observable<EntityResponseType> {
    return this.http.put<IFamilleProduit>(this.resourceUrl, familleProduit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFamilleProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFamilleProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
