import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service'
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit{
  /**
   * nbre total d'album
   */
  total:number = 0;

  /**
   * nbre d'album par page (stocké dans les variables d'environnement)
   */
  perPage:number;

  /** 
   * nbre de boutons à générer
  */
  numberPages: number = 0;

  /**tableau réunissant le label de chaque page */
  pages: number[] = [];

  constructor(
    private albumService: AlbumService
  ){
    this.perPage = this.albumService.paginateNumberPage();
  };

  ngOnInit():void{
    this.total = this.albumService.count();
    this.numberPages = Math.ceil(this.total / this.perPage);

    for (let i = 1; i < this.numberPages; i++) {
      this.pages.push(i);
    }
  }
}
