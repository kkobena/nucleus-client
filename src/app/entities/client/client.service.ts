import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IClient } from 'src/app/model/client.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { DATE_FORMAT } from 'src/app/shared/constants/input.constants';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IClient>;
type EntityArrayResponseType = HttpResponse<IClient[]>;
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public resourceUrl = SERVER_API_URL + 'api/clients';
  constructor(protected http: HttpClient) {}

  create(client: IClient): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .post<IClient>(this.resourceUrl, copy, { observe: 'response' });
     
  }

  update(client: IClient): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(client);
    return this.http
      .put<IClient>(this.resourceUrl, copy, { observe: 'response' });
      
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IClient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
     
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClient[]>(this.resourceUrl, { params: options, observe: 'response' });
    
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }


  protected convertDateFromClient(client: IClient): IClient {
    const copy: IClient = Object.assign({}, client, {
      createdAt: client.createdAt && client.createdAt.isValid() ? client.createdAt.format(DATE_FORMAT) : undefined,
      updatedAt: client.updatedAt && client.updatedAt.isValid() ? client.updatedAt.format(DATE_FORMAT) : undefined,
      datNaiss: client.datNaiss && client.datNaiss.isValid() ? client.datNaiss.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
      res.body.updatedAt = res.body.updatedAt ? moment(res.body.updatedAt) : undefined;
      res.body.datNaiss = res.body.datNaiss ? moment(res.body.datNaiss) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((client: IClient) => {
        client.createdAt = client.createdAt ? moment(client.createdAt) : undefined;
        client.updatedAt = client.updatedAt ? moment(client.updatedAt) : undefined;
        client.datNaiss = client.datNaiss ? moment(client.datNaiss) : undefined;
      });
    }
    return res;
  }
  queryTiersPayant(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IClient[]>(this.resourceUrl+'/tierspayant', { params: options, observe: 'response' });
     
  }
}
