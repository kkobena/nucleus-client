import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IRisque } from 'src/app/model/risque.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
type EntityResponseType = HttpResponse<IRisque>;
type EntityArrayResponseType = HttpResponse<IRisque[]>;
@Injectable({
  providedIn: 'root'
})
export class RisqueService {
  public resourceUrl = SERVER_API_URL + 'api/risques';

  constructor(protected http: HttpClient) {}

  create(risque: IRisque): Observable<EntityResponseType> {
    return this.http.post<IRisque>(this.resourceUrl, risque, { observe: 'response' });
  }

  update(risque: IRisque): Observable<EntityResponseType> {
    return this.http.put<IRisque>(this.resourceUrl, risque, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRisque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

 
  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  async query(req?: any): Promise<IRisque[]> {
    const options = createRequestOption(req);
    return await  this.http.get<IRisque[]>(this.resourceUrl, { params: options}).toPromise();
  }
}
