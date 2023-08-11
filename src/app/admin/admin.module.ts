import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { RouterModule, Routes } from '@angular/router';


//Définition de la constante pour les Routes
const routes: Routes = [
  {path: 'admin/add', component: AddAlbumComponent},
];

@NgModule({
  declarations: [
    AlbumComponent,
    AddAlbumComponent,
  ],

  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ShareModule,
  ],

  exports: [AlbumComponent]
})
export class AdminModule { }
