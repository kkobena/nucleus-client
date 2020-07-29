import { Injectable } from '@angular/core';
import { ITierspayant } from 'src/app/model/tierspayant.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<ITierspayant>;
type EntityArrayResponseType = HttpResponse<ITierspayant[]>;
@Injectable({
  providedIn: 'root'
})
export class TiersPayantService {

  public resourceUrl = SERVER_API_URL + 'api/tierspayants';

  constructor(protected http: HttpClient) {}

  create(entity: ITierspayant): Observable<EntityResponseType> {
    return this.http.post<ITierspayant>(this.resourceUrl, entity, { observe: 'response' });
  }

  update(entity: ITierspayant): Observable<EntityResponseType> {
    return this.http.put<ITierspayant>(this.resourceUrl, entity, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITierspayant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITierspayant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  uploadFile(file: any): Observable<EntityResponseType> {
    return this.http.post<ITierspayant>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }
}
