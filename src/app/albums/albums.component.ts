import { Component, OnInit } from '@angular/core';
//Importer la definition de la classe et les albums
import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import { fadeInAnimation } from '../animation.module';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css'],
  animations: [fadeInAnimation]

})
export class AlbumsComponent implements OnInit {
  titlePage: string = "Page principale Albums Music";
  albums: Album[] | undefined = undefined; // albums: Album[] = [];
  selectedAlbum!:Album; // ! signifie je suis sûr qu'une valeur sera passée au moment opportun
  status:string | null = null;

  constructor(
    private albumService: AlbumService
  ){
    console.log(`${this.albumService.count()} albums trouvés`);
  };

  onSelect(album:Album){
    this.selectedAlbum = album;
  };
  
  playParent($event: Album){
    this.status = $event.id;
  }

  ngOnInit(): void {
    this.albums = this.albumService.paginate(0, this.albumService.paginateNumberPage())
    // .order((a: Album, b: Album) => a.duration - b.duration) // lui il ordonne
    // .limit(0, this.albumService.paginateNumberPage()) //renvoie une sous partie 
    // .getAlbums();//récupère les albums
  };

  search($event: Album[]){
    if ($event) {
      this.albums = $event;
    }
    console.log(`Parent sera mis à jour et affichera seulement les albums ${$event}`);
  };

  onSetPaginate($event: {start: number, end: number}){
    this.albums = this.albumService.paginate($event.start, $event.end);
  }
}
