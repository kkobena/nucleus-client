import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { ICompteClient } from 'src/app/model/client.model';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<ICompteClient>;
type EntityArrayResponseType = HttpResponse<ICompteClient[]>;
@Injectable({
  providedIn: 'root'
})
export class CompteClientService {
  public resourceUrl = SERVER_API_URL + 'api/compte-clients';

  constructor(protected http: HttpClient) { }

  create(compteClient: ICompteClient): Observable<EntityResponseType> {

    return this.http
      .post<ICompteClient>(this.resourceUrl, compteClient, { observe: 'response' });

  }

  update(compteClient: ICompteClient): Observable<EntityResponseType> {
    return this.http
      .put<ICompteClient>(this.resourceUrl, compteClient, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ICompteClient>(`${this.resourceUrl}/${id}`, { observe: 'response' });

  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ICompteClient[]>(this.resourceUrl, { params: options, observe: 'response' });

  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
