import { Injectable } from '@angular/core';
import { Album, List } from './album';
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
    return this._albums.sort((a: Album, b: Album) => b.duration - a.duration); //utilisation de la méthode 'sort', qui prend une fonction avec paramètre (a, b)
  }

  /**
   * 
   * @param id identifiant de l'album à rechercher
   * @returns returns la liste 
   */
  getAlbum(id: string): Album | undefined {
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

  paginate(start: number, end: number):Album[]{
    return this._albums
    .slice(start, end)
    .sort((a: Album, b: Album) => b.duration - a.duration);
  }
}
