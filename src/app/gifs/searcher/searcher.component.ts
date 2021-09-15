import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styles: [
  ]
})
export class SearcherComponent {

  @ViewChild('searchText') searchText !: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  search() {
    const value = this.searchText.nativeElement.value;

    this.gifsService.searchGifs(value);
    
    this.searchText.nativeElement.value = '';
  }

}
