import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { ILaboratoire } from 'src/app/model/laboratoire.model';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<ILaboratoire>;
type EntityArrayResponseType = HttpResponse<ILaboratoire[]>;
@Injectable({
  providedIn: 'root'
})
export class LaboratoireProduitService {

  public resourceUrl = SERVER_API_URL + 'api/laboratoires';

  constructor(protected http: HttpClient) { }

  create(laboratoire: ILaboratoire): Observable<EntityResponseType> {
    return this.http.post<ILaboratoire>(this.resourceUrl, laboratoire, { observe: 'response' });
  }

  update(laboratoire: ILaboratoire): Observable<EntityResponseType> {
    return this.http.put<ILaboratoire>(this.resourceUrl, laboratoire, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILaboratoire>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILaboratoire[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<ILaboratoire[]> {
    const options = createRequestOption(req);
    return await this.http.get<ILaboratoire[]>(this.resourceUrl, { params: options }).toPromise();
  }
  uploadFile(file: any): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }
}
