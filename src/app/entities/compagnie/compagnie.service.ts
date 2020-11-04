import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { ICompagnie } from 'src/app/model/compagnie.model';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<ICompagnie>;
type EntityArrayResponseType = HttpResponse<ICompagnie[]>;
@Injectable({
  providedIn: 'root'
})
export class CompagnieService {

  public resourceUrl = SERVER_API_URL + 'api/compagnies';

  constructor(protected http: HttpClient) { }

  create(compagnie: ICompagnie): Observable<EntityResponseType> {
    return this.http.post<ICompagnie>(this.resourceUrl, compagnie, { observe: 'response' });
  }

  update(compagnie: ICompagnie): Observable<EntityResponseType> {
    return this.http.put<ICompagnie>(this.resourceUrl, compagnie, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICompagnie>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICompagnie[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<ICompagnie[]> {
    const options = createRequestOption(req);
    return await this.http.get<ICompagnie[]>(this.resourceUrl, { params: options }).toPromise();
  }
}
