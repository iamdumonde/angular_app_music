import { Component, OnInit } from '@angular/core';
//Importer la definition de la classe et les albums
import { Album, List } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
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

  // à l'initialisation affiche moi la liste des albums
  // ngOnInit(): void {
  //   this.albums = this.albumService.paginate(0, this.albumService.count());
  // };
  ngOnInit(): void {
    this.albums = this.albumService
    .order((a: Album, b: Album) => a.duration - b.duration) // lui il ordonne
    .limit(0, this.albumService.count()) //renvoie une sous partie 
    .getAlbums();//récupère les albums
  };


  search($event: Album[]){
    if ($event) {
      this.albums = $event;
    }
    console.log(`Parent sera mis à jour et affichera seulement les albums ${$event}`);
    
  }
}
