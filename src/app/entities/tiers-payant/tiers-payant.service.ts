import { Injectable } from '@angular/core';
import { ITierspayant } from 'src/app/model/tierspayant.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<ITierspayant>;
type EntityArrayResponseType = HttpResponse<ITierspayant[]>;
@Injectable({
  providedIn: 'root'
})
export class TiersPayantService {

  public resourceUrl = SERVER_API_URL + 'api/tierspayants';

  constructor(protected http: HttpClient) { }

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

  async queryPromise(req?: any): Promise<ITierspayant[]> {
    const options = createRequestOption(req);
    return await this.http.get<ITierspayant[]>(this.resourceUrl, { params: options }).toPromise();
  }
  uploadJsonFile(file: any): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/import-json`, file, { observe: 'response' });
  }
  uploadFile(file: any): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }

  async queryByTypeTiersPayantPromise(req?: any): Promise<ITierspayant[]> {
    const options = createRequestOption(req);
    return await this.http.get<ITierspayant[]>(this.resourceUrl + "/types", { params: options }).toPromise();
  }

  queryByTypeTiersPayant(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITierspayant[]>(this.resourceUrl + "/types", { params: options, observe: 'response' });
  }

  async findPromise(id: number): Promise<ITierspayant> {
    return await this.http.get<ITierspayant>(`${this.resourceUrl}/${id}`).toPromise();
  }
}
