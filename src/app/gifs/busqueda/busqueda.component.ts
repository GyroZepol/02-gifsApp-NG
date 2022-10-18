import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  // buscar( event: KeyboardEvent) {
  //   console.log(event.)
  // }
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; //Seleccionar un elemento html por referencia local
  //Con el signo de exclamación ignora el error
  constructor( private gifsService: GifsService ) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs( valor );

    this.txtBuscar.nativeElement.value = '';
  }
}
