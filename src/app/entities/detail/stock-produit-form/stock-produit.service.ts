import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IStockProduit } from 'src/app/model/stock-produit.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IStockProduit>;
type EntityArrayResponseType = HttpResponse<IStockProduit[]>;
@Injectable({
  providedIn: 'root'
})
export class StockProduitService {

  public resourceUrl = SERVER_API_URL + 'api/stock-produits';

  constructor(protected http: HttpClient) { }

  create(magasin: IStockProduit): Observable<EntityResponseType> {
    return this.http.post<IStockProduit>(this.resourceUrl, magasin, { observe: 'response' });
  }

  update(magasin: IStockProduit): Observable<EntityResponseType> {
    return this.http.put<IStockProduit>(this.resourceUrl, magasin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStockProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStockProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IStockProduit[]> {
    const options = createRequestOption(req);
    return await this.http.get<IStockProduit[]>(this.resourceUrl, { params: options }).toPromise();
  }
}
