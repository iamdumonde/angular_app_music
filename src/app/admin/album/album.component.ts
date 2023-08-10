import { Component, OnInit } from '@angular/core';
import { Album } from 'src/app/album';
import { AlbumService } from 'src/app/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit{
  constructor(
    private aS: AlbumService
  ){}

  albums!: Album[];
  ngOnInit(): void {
    this.aS.getAlbums().subscribe({
      next: (alb) => {this.albums = alb}
  })
  }
}
