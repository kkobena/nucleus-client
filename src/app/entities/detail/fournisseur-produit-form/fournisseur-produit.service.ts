import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IFournisseurProduit } from 'src/app/model/fournisseur-produit.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IFournisseurProduit>;
type EntityArrayResponseType = HttpResponse<IFournisseurProduit[]>;

@Injectable({
  providedIn: 'root'
})
export class FournisseurProduitService {


  public resourceUrl = SERVER_API_URL + 'api/fournisseur-produits';

  constructor(protected http: HttpClient) { }

  create(magasin: IFournisseurProduit): Observable<EntityResponseType> {
    return this.http.post<IFournisseurProduit>(this.resourceUrl, magasin, { observe: 'response' });
  }

  update(magasin: IFournisseurProduit): Observable<EntityResponseType> {
    return this.http.put<IFournisseurProduit>(this.resourceUrl, magasin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFournisseurProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFournisseurProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IFournisseurProduit[]> {
    const options = createRequestOption(req);
    return await this.http.get<IFournisseurProduit[]>(this.resourceUrl, { params: options }).toPromise();
  }
  async findPromise(id: number): Promise<IFournisseurProduit> {
    return await this.http.get<IFournisseurProduit>(`${this.resourceUrl}/${id}`).toPromise();
  }
}
