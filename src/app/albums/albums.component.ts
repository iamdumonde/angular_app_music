import { Component, OnInit } from '@angular/core';
//Importew la definition de la classe et les albums
import { Album } from '../album';
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  titlePage: string = "Page principale Albums Music";
  albums: Album[] = ALBUMS;
  constructor(){}

  ngOnInit(): void {
      
  }
}

