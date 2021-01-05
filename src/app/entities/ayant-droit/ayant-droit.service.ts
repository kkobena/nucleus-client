import { Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { IAyantDroit } from 'src/app/model/ayant-droit.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { Observable } from 'rxjs';
import { createRequestOption } from 'src/app/shared/util/request-util';


type EntityResponseType = HttpResponse<IAyantDroit>;
type EntityArrayResponseType = HttpResponse<IAyantDroit[]>;
@Injectable({
  providedIn: 'root'
})
export class AyantDroitService {
  public resourceUrl = SERVER_API_URL + 'api/ayant-droits';
  constructor(protected http: HttpClient) { }

  create(ayantDroit: IAyantDroit): Observable<EntityResponseType> {
    return this.http
      .post<IAyantDroit>(this.resourceUrl, ayantDroit, { observe: 'response' });

  }

  update(ayantDroit: IAyantDroit): Observable<EntityResponseType> {
    return this.http
      .put<IAyantDroit>(this.resourceUrl, ayantDroit, { observe: 'response' });

  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAyantDroit>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      ;
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAyantDroit[]>(this.resourceUrl, { params: options, observe: 'response' })
      ;
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
