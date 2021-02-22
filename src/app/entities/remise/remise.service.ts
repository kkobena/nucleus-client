import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IRemise } from 'src/app/model/remise.model';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { SERVER_API_URL } from 'src/app/app.constants';
type EntityResponseType = HttpResponse<IRemise>;
type EntityArrayResponseType = HttpResponse<IRemise[]>;

@Injectable({
  providedIn: 'root'
})

export class RemiseService {

  public resourceUrl = SERVER_API_URL + 'api/remises';

  constructor(protected http: HttpClient) { }

  create(remise: IRemise): Observable<EntityResponseType> {
    let url = this.resourceUrl;
    if (remise.typeRemise == 'RC') {
      url = url + '/client';

    } else if (remise.typeRemise == 'RP') {
      url = url + '/produit';
    }
    return this.http.post<IRemise>(url, remise, { observe: 'response' });
  }

  update(remise: IRemise): Observable<EntityResponseType> {
    let url = this.resourceUrl;
    if (remise.typeRemise == 'RC') {
      url = url + '/client';

    } else if (remise.typeRemise == 'RP') {
      url = url + '/produit';
    }
    return this.http.put<IRemise>(url, remise, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRemise>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRemise[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  disabled(id: number): Observable<EntityResponseType> {
    return this.http.delete(`${this.resourceUrl}/disbale/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IRemise[]> {
    const options = createRequestOption(req);
    return await this.http.get<IRemise[]>(this.resourceUrl, { params: options }).toPromise();
  }
}
