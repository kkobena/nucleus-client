import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ITypeMvtCaisse } from 'src/app/model/type-mvt-caisse.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<ITypeMvtCaisse>;
type EntityArrayResponseType = HttpResponse<ITypeMvtCaisse[]>;
@Injectable({
  providedIn: 'root'
})
export class TypeMvtCaisseService {

  public resourceUrl = SERVER_API_URL + 'api/type-mvt-caisses';

  constructor(protected http: HttpClient) {}

  create(typeMvtCaisse: ITypeMvtCaisse): Observable<EntityResponseType> {
    return this.http.post<ITypeMvtCaisse>(this.resourceUrl, typeMvtCaisse, { observe: 'response' });
  }

  update(typeMvtCaisse: ITypeMvtCaisse): Observable<EntityResponseType> {
    return this.http.put<ITypeMvtCaisse>(this.resourceUrl, typeMvtCaisse, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeMvtCaisse>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeMvtCaisse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
