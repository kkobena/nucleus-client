import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMagasin } from 'src/app/model/magasin.model';
import { SERVER_API_URL } from 'src/app/app.constants';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
import { TypeMagasin } from 'src/app/model/enumerations/type-magasin.model';

type EntityResponseType = HttpResponse<IMagasin>;
type EntityArrayResponseType = HttpResponse<IMagasin[]>;

@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  public resourceUrl = SERVER_API_URL + 'api/magasins';

  constructor(protected http: HttpClient) { }

  create(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.post<IMagasin>(this.resourceUrl, magasin, { observe: 'response' });
  }

  update(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.put<IMagasin>(this.resourceUrl, magasin, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMagasin>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMagasin[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
  async queryPromise(req?: any): Promise<IMagasin[]> {
    const options = createRequestOption(req);
    return await this.http.get<IMagasin[]>(this.resourceUrl, { params: options }).toPromise();
  }
  uploadFile(file: any): Observable<HttpResponse<IResponseDto>> {
    return this.http.post<IResponseDto>(`${this.resourceUrl}/importcsv`, file, { observe: 'response' });
  }
  async findPromise(id: number): Promise<IMagasin> {
    return await this.http.get<IMagasin>(`${this.resourceUrl}/${id}`).toPromise();
  }
  async findConnectedUserMagasin(): Promise<IMagasin> {
    return await this.http.get<IMagasin>(`${this.resourceUrl}/user/magasin`).toPromise();
  }
  updateStockage(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.put<IMagasin>(`${this.resourceUrl}/stockage`, magasin, { observe: 'response' });
  }
  createStockage(magasin: IMagasin): Observable<EntityResponseType> {
    magasin.typeMagasin = TypeMagasin.SAFETY_STOCK;
    return this.http.post<IMagasin>(`${this.resourceUrl}/stockage`, magasin, { observe: 'response' });
  }

  updateDepot(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.put<IMagasin>(`${this.resourceUrl}/depot`, magasin, { observe: 'response' });
  }
  createDepot(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.post<IMagasin>(`${this.resourceUrl}/depot`, magasin, { observe: 'response' });
  }
  updateInfoTicket(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.put<IMagasin>(`${this.resourceUrl}/infosticket`, magasin, { observe: 'response' });
  }
  updateManager(magasin: IMagasin): Observable<EntityResponseType> {
    return this.http.put<IMagasin>(`${this.resourceUrl}/${magasin.id}/user/${magasin.managerId}`, {}, { observe: 'response' });
  }

  async findConnectedUserStockages(): Promise<IMagasin[]> {
    return await this.http.get<IMagasin[]>(`${this.resourceUrl}/user/stockages`).toPromise();
  }

  async findMagasins(): Promise<IMagasin[]> {
    return await this.http.get<IMagasin[]>(`${this.resourceUrl}/principals/`).toPromise();
  }
}
