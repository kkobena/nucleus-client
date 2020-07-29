import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'src/app/app.constants';
import { ITypeRisque } from 'src/app/model/type-risque.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<ITypeRisque>;
type EntityArrayResponseType = HttpResponse<ITypeRisque[]>;
@Injectable({
  providedIn: 'root'
})
export class TypeRisqueService {
  public resourceUrl = SERVER_API_URL + 'api/type-risques';
  constructor(protected http: HttpClient) {}
  create(typeRisque: ITypeRisque): Observable<EntityResponseType> {
    return this.http.post<ITypeRisque>(this.resourceUrl, typeRisque, { observe: 'response' });
  }

  update(typeRisque: ITypeRisque): Observable<EntityResponseType> {
    return this.http.put<ITypeRisque>(this.resourceUrl, typeRisque, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeRisque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeRisque[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
