import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMagasin } from 'src/app/model/magasin.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<IMagasin>;
type EntityArrayResponseType = HttpResponse<IMagasin[]>;

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  public resourceUrl = SERVER_API_URL + 'api/magasins';

  constructor(protected http: HttpClient) { }

  create(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.post<IMagasin>(this.resourceUrl, magasin, { observe: 'response' });
  }

  update(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.put<IMagasin>(this.resourceUrl, magasin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMagasin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMagasin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IMagasin[]> {
    const options = createRequestOption(req);
    return await this.http.get<IMagasin[]>(this.resourceUrl, { params: options }).toPromise();
  }
}
