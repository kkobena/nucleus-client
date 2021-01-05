import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IRayon } from 'src/app/model/rayon.model';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<IRayon>;
type EntityArrayResponseType = HttpResponse<IRayon[]>;

@Injectable({
  providedIn: 'root'
})
export class RayonService {

  public resourceUrl = SERVER_API_URL + 'api/rayons';

  constructor(protected http: HttpClient) { }

  create(magasin: IRayon): Observable<EntityResponseType> {
    return this.http.post<IRayon>(this.resourceUrl, magasin, { observe: 'response' });
  }

  update(magasin: IRayon): Observable<EntityResponseType> {
    return this.http.put<IRayon>(this.resourceUrl, magasin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRayon>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRayon[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IRayon[]> {
    const options = createRequestOption(req);
    return await this.http.get<IRayon[]>(this.resourceUrl, { params: options }).toPromise();
  }
  async findPromise(id: number): Promise<IRayon> {
    return await this.http.get<IRayon>(`${this.resourceUrl}/${id}`).toPromise();
  }
}
