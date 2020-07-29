import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'src/app/app.constants';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { IGroupeTierspayant } from 'src/app/model/groupe-tierspayant.model';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';

type EntityResponseType = HttpResponse<IGroupeTierspayant>;
type EntityArrayResponseType = HttpResponse<IGroupeTierspayant[]>;
@Injectable({
  providedIn: 'root'
})
export class GroupeTierspayantService {
  public resourceUrl = SERVER_API_URL + 'api/groupe-tierspayants';

  constructor(protected http: HttpClient) {}

  create(groupeTierspayant: IGroupeTierspayant): Observable<EntityResponseType> {
    return this.http.post<IGroupeTierspayant>(this.resourceUrl, groupeTierspayant, { observe: 'response' });
  }

  update(groupeTierspayant: IGroupeTierspayant): Observable<EntityResponseType> {
    return this.http.put<IGroupeTierspayant>(this.resourceUrl, groupeTierspayant, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupeTierspayant>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupeTierspayant[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  uploadFile(file: any): Observable<EntityResponseType> {
    return this.http.post<IGroupeTierspayant>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }
}
