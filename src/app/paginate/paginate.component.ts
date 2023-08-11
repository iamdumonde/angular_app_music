import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlbumService } from '../album.service'

@Component({
  selector: 'app-paginate',
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.css']
})
export class PaginateComponent implements OnInit {
  /**
   * nbre total d'album
   */
  total: number = 0;

  /**
   * nbre d'album par page (stocké dans les variables d'environnement)
   */
  perPage: number;

  /** 
   * nbre de boutons à générer
  */
  numberPages: number = 0;

  /**tableau réunissant le label de chaque page */
  pages: number[] = [];

  /**Emetter d'évènement pour les paginates */
  @Output() setPaginate: EventEmitter<{ start: number, end: number }> = new EventEmitter()

  /**variable stockant la page actuelle */
  currentPage: number = 1;

  constructor(
    private albumService: AlbumService
  ) {
    this.perPage = this.albumService.paginateNumberPage();
  };

  ngOnInit(): void {
    this.albumService.count().subscribe(num => {
      this.total = num
      this.numberPages = Math.ceil(this.total / this.perPage);
      console.log(this.numberPages);
      for (let i = 1; i <= this.numberPages; i++) {
        this.pages.push(i);
      }
    })
    // console.log(this.total);
  }


  next() {
    //si nous avons déjà atteint la dernière page de pagination
    if (this.currentPage < this.numberPages) {
      this.currentPage++; //incrémente
    }
    //demander aux parents d'afficher les albums suivants dans la liste
    this.setPaginate.emit(this.setAlbums(this.currentPage));
  }

  previous() {
    //si nous avons déjà atteint la dernière page de pagination
    if (this.currentPage > 1) {
      this.currentPage--; //incrémente
    }
    //demander aux parents d'afficher les albums suivants dans la liste
    this.setPaginate.emit(this.setAlbums(this.currentPage));
  }
  
  changePage(page: number){
    this.currentPage = page;
    this.setPaginate.emit(this.setAlbums(this.currentPage));
  }


  /**
   * Fonction qui retourne le sous ensemble d'albums à afficher
   * @param page page courante
   * @returns  un sous ensemble du tableau en fonction de la page courante
   */
  setAlbums(page: number): { start: number, end: number } {
    let start = (page - 1) * this.perPage; // 0 2
    let end = start + this.perPage;
    return { start: start, end: end }
  }
}
