import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/app/app.constants';
import { IProduit } from 'src/app/model/produit.model';
import { createRequestOption } from 'src/app/shared/util/request-util';
import { IResponseDto } from 'src/app/shared/util/response-dto';
type EntityResponseType = HttpResponse<IProduit>;
type EntityArrayResponseType = HttpResponse<IProduit[]>;
@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  public resourceUrl = SERVER_API_URL + 'api/produits';
  constructor(protected http: HttpClient) { }


}
