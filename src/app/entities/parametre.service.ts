import { HttpClient, HttpResponse } from '@angular/common/http';
import { IParametre } from 'src/app/model/parametre.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { createRequestOption } from '../shared/util/request-util';
import { SERVER_API_URL } from '../app.constants';
type EntityResponseType = HttpResponse<IParametre>;
type EntityArrayResponseType = HttpResponse<IParametre[]>;
@Injectable({
  providedIn: 'root'
})
export class ParametreService {
  public resourceUrl = SERVER_API_URL + 'api/parametres';

  constructor(protected http: HttpClient) { }

  create(typeEtiquette: IParametre): Observable<EntityResponseType> {
    return this.http.post<IParametre>(this.resourceUrl, typeEtiquette, { observe: 'response' });
  }

  update(typeEtiquette: IParametre): Observable<EntityResponseType> {
    return this.http.put<IParametre>(this.resourceUrl, typeEtiquette, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IParametre>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IParametre[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IParametre[]> {
    const options = createRequestOption(req);
    return await this.http.get<IParametre[]>(this.resourceUrl, { params: options }).toPromise();
  }
}

