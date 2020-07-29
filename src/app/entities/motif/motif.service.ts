import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IMotif } from 'src/app/model/motif.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IMotif>;
type EntityArrayResponseType = HttpResponse<IMotif[]>;
@Injectable({
  providedIn: 'root'
})
export class MotifService {

  public resourceUrl = SERVER_API_URL + 'api/motifs';

  constructor(protected http: HttpClient) {}

  create(motif: IMotif): Observable<EntityResponseType> {
    return this.http.post<IMotif>(this.resourceUrl, motif, { observe: 'response' });
  }

  update(motif: IMotif): Observable<EntityResponseType> {
    return this.http.put<IMotif>(this.resourceUrl, motif, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMotif>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMotif[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
