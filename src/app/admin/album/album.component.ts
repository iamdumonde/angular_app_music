import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit {
  constructor(
    private aS: AlbumService,
    private route: ActivatedRoute
  ) { }


  //
  message: string | undefined;

  albums!: Album[];
  
  ngOnInit(): void {
    this.aS.getAlbums().subscribe({
      next: (alb) => { this.albums = alb }
    });

    //méthode pour paginate, recopier du parent albums.component.ts
    this.aS
    .paginate(0, this.aS.paginateNumberPage())
    .subscribe({
      next: (alb: Album[]) => {
        this.albums = alb,
        console.log("getAlbums()", this.albums);

      }
    })

    //
    this.route.queryParams.subscribe(params => {
      this.message = params['message']
    })
  }

  //tsLint de désactiver la désactivation du titre pour les types à suvivre
  onSetPaginate($event: {start: number, end: number}){
    this.aS.paginate($event.start, $event.end)
    .subscribe({
      next: (alb: Album[]) => this.albums = alb
    });
  }
}
