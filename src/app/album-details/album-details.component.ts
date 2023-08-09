//Component enfant
//la classe Input est nécessaire
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Album, List } from '../album';
import { AlbumService } from '../album.service';
import { fadeInAnimation } from '../animation.module';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
  animations: [fadeInAnimation]

})

//à chaque hook son interface
export class AlbumDetailsComponent implements OnInit, OnChanges {
  //Classe Input permet de récupérer les data del'enfant
  //album est lié à une entrée [album] du parent dans le sélecteur

  //Les @ spécifient que ce sont des décorateurs
  @Input() album!: Album; //propriété liée passée par le parent
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  //tableau qui stock la liste des chansons de l'album
  songs: string[] | undefined = []; 

  constructor(
    private albumService: AlbumService
  ) {};

  ngOnInit() {
    console.log("Composant initialisé"); //pour l'instant c'est undefined   
  };

  //récupérer la liste des chansons
  ngOnChanges(): void {
    if (this.album) {
      this.albumService.getAlbumList(this.album.id).subscribe(
        (albumList) => {this.songs = albumList.list}
      )
    }
  }

  //le bouton "play" 
  play(album: Album) {
    //émettre un album vers le parent
    this.onPlay.emit(album); //émettre un album vers le parent
    this.albumService.switchOn(album)
  }

}
