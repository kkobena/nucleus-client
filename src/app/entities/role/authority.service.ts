import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IAuthority } from 'src/app/model/authority.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<IAuthority>;
type EntityArrayResponseType = HttpResponse<IAuthority[]>;
@Injectable({
  providedIn: 'root'
})
export class AuthorityService {


  public resourceUrl = SERVER_API_URL + 'api/authorities';

  constructor(protected http: HttpClient) { }

  create(magasin: IAuthority): Observable<EntityResponseType> {
    return this.http.post<IAuthority>(this.resourceUrl, magasin, { observe: 'response' });
  }

  update(magasin: IAuthority): Observable<EntityResponseType> {
    return this.http.put<IAuthority>(this.resourceUrl, magasin, { observe: 'response' });
  }

  find(name: string): Observable<EntityResponseType> {
    return this.http.get<IAuthority>(`${this.resourceUrl}/${name}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAuthority[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(name: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${name}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IAuthority[]> {
    const options = createRequestOption(req);
    return await this.http.get<IAuthority[]>(this.resourceUrl, { params: options }).toPromise();
  }
  async findPromise(name: string): Promise<IAuthority> {
    return await this.http.get<IAuthority>(`${this.resourceUrl}/${name}`).toPromise();
  }


  uploadFile(file: any, magasinId: number): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/importcsv/${magasinId}`, file, { observe: 'response' });
  }
}
