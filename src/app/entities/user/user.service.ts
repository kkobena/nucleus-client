import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IUser } from 'src/app/model/user.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<IUser>;
type EntityArrayResponseType = HttpResponse<IUser[]>;
@Injectable({
  providedIn: 'root'
})
export class UserService {


  public resourceUrl = SERVER_API_URL + 'api/users';

  constructor(protected http: HttpClient) { }

  create(user: IUser): Observable<EntityResponseType> {
    return this.http.post<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  update(user: IUser): Observable<EntityResponseType> {
    return this.http.put<IUser>(this.resourceUrl, user, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IUser>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IUser[]> {
    const options = createRequestOption(req);
    return await this.http.get<IUser[]>(this.resourceUrl, { params: options }).toPromise();
  }
  uploadFile(file: any): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }
  async findPromise(id: number): Promise<IUser> {
    return await this.http.get<IUser>(`${this.resourceUrl}/${id}`).toPromise();
  }
  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities');
  }

  enable(user: IUser): Observable<EntityResponseType> {
    return this.http.post<IUser>(`${this.resourceUrl}/activate`, user, { observe: 'response' });
  }
}
