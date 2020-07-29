import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ITypeInventaire } from 'src/app/model/type-inventaire.model';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { SERVER_API_URL } from 'src/app/app.constants';
type EntityResponseType = HttpResponse<ITypeInventaire>;
type EntityArrayResponseType = HttpResponse<ITypeInventaire[]>;
@Injectable({
  providedIn: 'root'
})
export class TypeInventaireService {

  public resourceUrl = SERVER_API_URL + 'api/type-inventaires';

  constructor(protected http: HttpClient) {}

  create(typeInventaire: ITypeInventaire): Observable<EntityResponseType> {
    return this.http.post<ITypeInventaire>(this.resourceUrl, typeInventaire, { observe: 'response' });
  }

  update(typeInventaire: ITypeInventaire): Observable<EntityResponseType> {
    return this.http.put<ITypeInventaire>(this.resourceUrl, typeInventaire, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITypeInventaire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITypeInventaire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
