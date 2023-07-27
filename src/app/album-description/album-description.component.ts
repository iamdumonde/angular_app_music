import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-album-description',
  templateUrl: './album-description.component.html',
  styleUrls: ['./album-description.component.css']
})

export class AlbumDescriptionComponent implements OnInit {
  album: Album | undefined;

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute, //récupérez le service route
    // private aS: AlbumService // récupérez le service
  ){}

  ngOnInit(){
    /**
     * permet de récupérer l'identifiant
     */
    const id: string = this.route.snapshot.params['albumId'];

    //permet de récupérer les détails
    this.album = this.albumService.getAlbum(id);
    // console.log(this.route.snapshot.paramMap.get('albumId'));
    console.log(this.album);
    
    
    
    
    
  }
}
