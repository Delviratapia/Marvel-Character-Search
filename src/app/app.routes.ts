import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CharacterComponent } from './character/character.component';

export const routes: Routes = [
    {path: "", 
        component:HomeComponent, },
    {path: "character/:id", 
        component: CharacterComponent, }

];
