import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  //Angular lo declara de manera global en toda la aplicacion.
  //Por lo tanto, no tengo necesidad de declararlo en el "provider" de un modulo en especifico.
  providedIn: 'root'
})
export class GifsService {
  private _historial  : string[] = [];
  private _apiKey     : string = 'MCHbw1f5x3pu1EHcknxzefhBwv19grd7';
  private _serviceUrl : string = 'https://api.giphy.com/v1/gifs';

  public results: Gif[] = [];

  constructor( private http: HttpClient ) {
    this._historial = JSON.parse( localStorage.getItem('historial')! ) || [];
    this.results = JSON.parse( localStorage.getItem('results')! ) || [];

  }

  get historial() {
    return [...this._historial];
  }

  searchGifs( query: string ) {
    query = query.trim().toLowerCase(); 

    if( query.trim() !== '' && !this.historial.includes( query )){
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    }

    const params = new HttpParams()
                    .set('api_key', this._apiKey)
                    .set('limit', '10')
                    .set('q', query);

    console.log(params.toString());

    this.http.get<SearchGifsResponse>( `${ this._serviceUrl }/search`, { params: params } )
      .subscribe( ( response ) => {
        this.results = response.data;
        localStorage.setItem('historial', JSON.stringify(this._historial));
        localStorage.setItem('results', JSON.stringify(this.results));
      })

    console.log(this._historial);
  }
}
