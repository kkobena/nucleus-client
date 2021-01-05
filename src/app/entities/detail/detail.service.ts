import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IProduit } from 'src/app/model/produit.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<IProduit>;
type EntityArrayResponseType = HttpResponse<IProduit[]>;
@Injectable({
  providedIn: 'root'
})
export class DetailService {
  public resourceUrl = SERVER_API_URL + 'api/produits';
  constructor(protected http: HttpClient) { }

  create(produit: IProduit): Observable<EntityResponseType> {
    return this.http
      .post<IProduit>(this.resourceUrl, produit, { observe: 'response' });

  }

  update(produit: IProduit): Observable<EntityResponseType> {
    return this.http
      .put<IProduit>(this.resourceUrl, produit, { observe: 'response' });

  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });

  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduit[]>(this.resourceUrl, { params: options, observe: 'response' });

  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async findPromise(id: number): Promise<IProduit> {
    return await this.http.get<IProduit>(`${this.resourceUrl}/${id}`).toPromise();
  }

  queryDetails(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IProduit[]>(this.resourceUrl + "/criteria", { params: options, observe: 'response' });

  }



}
