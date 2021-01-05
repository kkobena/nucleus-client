import { Injectable } from '@angular/core';
import { IFournisseur } from 'src/app/model/fournisseur.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IFournisseur>;
type EntityArrayResponseType = HttpResponse<IFournisseur[]>;
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  public resourceUrl = SERVER_API_URL + 'api/fournisseurs';

  constructor(protected http: HttpClient) { }

  create(fournisseur: IFournisseur): Observable<EntityResponseType> {
    return this.http.post<IFournisseur>(this.resourceUrl, fournisseur, { observe: 'response' });
  }

  update(fournisseur: IFournisseur): Observable<EntityResponseType> {
    return this.http.put<IFournisseur>(this.resourceUrl, fournisseur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFournisseur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFournisseur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IFournisseur[]> {
    const options = createRequestOption(req);
    return await this.http.get<IFournisseur[]>(this.resourceUrl, { params: options }).toPromise();
  }
  async findPromise(id: number): Promise<IFournisseur> {
    return await this.http.get<IFournisseur>(`${this.resourceUrl}/${id}`).toPromise();
  }
}
