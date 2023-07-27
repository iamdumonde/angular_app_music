import { Injectable } from '@angular/core';
import { Album, List, SortAlbumCallback } from './album';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

@Injectable({
  providedIn: 'root'
})

export class AlbumService {
  private _albums: Album[] = ALBUMS; //convention Private & Protected
  private _albumList: List[] = ALBUM_LISTS;

  constructor() { }

  /**
   * Fonction de recherche de tous les albums
   * @returns la liste de tous les albums
   */
  getAlbums(): Album[] {
    return this._albums;
  }

  /**
   * 
   * @param id identifiant de l'album à rechercher
   * @returns returns la liste 
   */
  getAlbum(id: string | null): Album | undefined {
    return this._albums.find(album => album.id === id);
  }

  /**
   * Fonctions de recherche des sons d'un album
   * @param id  identifiant de l'album à rechercher
   * @returns 
   */
  getAlbumList(id: string): List | undefined {
    return this._albumList.find(list => list.id === id);
  }

  /**
   * Fonction qui returne le nombre albums
   * @returns le nombre d'albums
   */
  count() {
    return this._albums.length;
  }

  // paginate(start: number, end: number):Album[]{
  //   return this._albums
  //   .slice(start, end)
  //   .sort((a: Album, b: Album) => b.duration - a.duration);
  // }
  order(callback: SortAlbumCallback): AlbumService {
    this._albums.sort(callback)
    return this; //retourne le service pour permettere le chainage de méthode
  }

  limit(start: number, end: number): AlbumService {
    this._albums = this._albums.slice(start, end);
    return this;
  }

  search(word: string): Album[] {
    return this._albums.filter(album => { 
      return album.title
      .toLowerCase()
      .includes(word.trim().toLowerCase());
    });
  }
}


