import { Component, OnInit } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.css']
})
export class AudioPlayerComponent implements OnInit {
  //Variable permettant d'afficher ou non, le component audio-player
  showplayer: boolean = false;

  /**Variable représentant l'album joué */
  playedAlbum!: Album;

  /**Variable représentant le nombre total de sons dans l'album */
  total: number = 1;

  /**Variable représentant le numéro du sons joué actuellement c'est à dire 1/4 */
  currentSongNumber: number = 1;

  //ratio de la barre de progression
  /**Variable représentant le pourcentage de sons joué (35%  pour 1/4, 50% pour 2/4) */
  ratio: number = 0;

  constructor(private albumService: AlbumService) { }


  ngOnInit(): void {
    //souscrire au Sujet pour recevoir les notifications
    this.albumService.subjectAlbum.subscribe({
      next: (a: Album) => {
        //Stocker l'album récupérer
        this.playedAlbum = a;
        //Permet d'afficher le Composant AudioPlayer sur la page
        this.showplayer = true;
        //le son joué ici en premier est le numéro 1
        this.currentSongNumber = 1;

        let duration: number = this.playedAlbum.duration;//la durée totale de l'Album
        this.total = Math.floor(duration / 120);

        //Le ratio pour la barre de progression
        this.ratio = (100 / this.total);
        console.log(this.ratio);
        /**Variable représentant le pourcentage à ajouter après chaque son dans la barre de progression */
        let step = this.ratio; //Il faut à chaque fois augmenter le ratio%

        /**Augmenter le niveau de la barre de progression chaque 120 000 millisecondes */
        const intervalId = setInterval(() => {
          this.currentSongNumber++;
          this.ratio += step;

          if(this.ratio > 100){
            clearInterval(intervalId);
            this.showplayer = false;
            this.albumService.switchOff(this.playedAlbum);
          }
        }, 1000)
        
      }
    });
  }

}
