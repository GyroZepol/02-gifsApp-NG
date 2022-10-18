import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' //Elevar el servicio a un alcance global
})
export class GifsService {

  private apiKey: string = 'yXme1WM1PPLQYQ2wQyEfruFYA3yXHdtc'
  private servicioUrl: string = 'http://api.giphy.com/v1/gifs'
  private _historial: string[] = []

  //Cambia any por su tipo correpondiente
  public resultados: Gif[] = []

  get historial() {
    // this._historial = this._historial.splice(0,10);
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []

    this.resultados = JSON.parse(localStorage.getItem('lastQuery')!) || []
    // if(localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!)
    // }

  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();
    
    if( !this._historial.includes(query) ) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial',JSON.stringify(this._historial))

    }

    const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);

    console.log(params.toString());
    
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
    .subscribe( (resp) => {
      this.resultados = resp.data;
      localStorage.setItem('lastQuery',JSON.stringify(this.resultados))
    })
    
  }



}
