import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IGammeProduit } from 'src/app/model/gamme-produit.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<IGammeProduit>;
type EntityArrayResponseType = HttpResponse<IGammeProduit[]>;
@Injectable({
  providedIn: 'root'
})
export class GammeProduitService {
  public resourceUrl = SERVER_API_URL + 'api/gamme-produits';

  constructor(protected http: HttpClient) { }

  create(gammeProduit: IGammeProduit): Observable<EntityResponseType> {
    return this.http.post<IGammeProduit>(this.resourceUrl, gammeProduit, { observe: 'response' });
  }

  update(gammeProduit: IGammeProduit): Observable<EntityResponseType> {
    return this.http.put<IGammeProduit>(this.resourceUrl, gammeProduit, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGammeProduit>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGammeProduit[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IGammeProduit[]> {
    const options = createRequestOption(req);
    return await this.http.get<IGammeProduit[]>(this.resourceUrl, { params: options }).toPromise();
  }
  uploadFile(file: any): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }
}
