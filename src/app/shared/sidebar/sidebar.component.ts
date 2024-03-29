import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  constructor( private gifsService: GifsService ) { }
  
  get historial() {
    return this.gifsService.historial;
  }

  searchByClick( gifName: any ){
    this.gifsService.searchGifs( gifName )
  }
}
