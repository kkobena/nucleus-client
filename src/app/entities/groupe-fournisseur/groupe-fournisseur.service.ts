import { Injectable } from '@angular/core';
import { IGroupeFournisseur } from 'src/app/model/groupe-fournisseur.model';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<IGroupeFournisseur>;
type EntityArrayResponseType = HttpResponse<IGroupeFournisseur[]>;
@Injectable({
  providedIn: 'root'
})
export class GroupeFournisseurService {

  public resourceUrl = SERVER_API_URL + 'api/groupe-fournisseurs';

  constructor(protected http: HttpClient) { }

  create(groupeFournisseur: IGroupeFournisseur): Observable<EntityResponseType> {
    return this.http.post<IGroupeFournisseur>(this.resourceUrl, groupeFournisseur, { observe: 'response' });
  }

  update(groupeFournisseur: IGroupeFournisseur): Observable<EntityResponseType> {
    return this.http.put<IGroupeFournisseur>(this.resourceUrl, groupeFournisseur, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGroupeFournisseur>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGroupeFournisseur[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  uploadFile(file: any): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IGroupeFournisseur[]> {
    const options = createRequestOption(req);
    return await this.http.get<IGroupeFournisseur[]>(this.resourceUrl, { params: options }).toPromise();
  }
}
