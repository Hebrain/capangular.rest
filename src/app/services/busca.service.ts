import { Estabelecimento } from './../models/estabelecimento.model';
import { Coordenada } from './../models/coordenada.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const apiEstabelecimentoURL = "https://api.openbrewerydb.org/breweries";
const apiCoordenadaURL = "http://www.geoplugin.net/json.gp?ip=";
const apiIpAdreesUrl = "http://api.ipify.org/?format=json";


@Injectable()
export class BuscaService {



  constructor(private http:HttpClient) { }

  getIp(){ return this.http.get<Ip>(apiIpAdreesUrl); }

  getEstablishment(): Observable<Estabelecimento> {

    return this.http.get<Estabelecimento>(apiEstabelecimentoURL);
  }

  getCoordinates(ip: string): Observable<Coordenada>{

    return this.http.get<Coordenada>(apiCoordenadaURL + ip);
  }

  getBy(myCoordinates: Coordenada, Establishment: Estabelecimento[], km: number): Estabelecimento[]{

    return Establishment = Establishment.filter(item => this.convertCordinatesInKm(myCoordinates, item) <= km);
  }

  convertCordinatesInKm(myCoordinates: Coordenada, searchCordinates: Estabelecimento){

    let earthRadius = 6371
    let latitude = this.deg2rad(searchCordinates.latitude - myCoordinates.geoplugin_latitude);
    let longitude = this.deg2rad(searchCordinates.longitude - myCoordinates.geoplugin_longitude);

    let a = Math.sin(latitude / 2) * Math.sin(latitude / 2) +
    Math.cos(this.deg2rad(myCoordinates.geoplugin_latitude)) *
    Math.cos(this.deg2rad(searchCordinates.latitude)) *
    Math.sin(longitude / 2) * Math.sin(longitude / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let dist: number = earthRadius * c;

    return dist;
  }

  deg2rad(deg: number) {return deg * (Math.PI / 180)}
}

export interface Ip{ip: string;}
