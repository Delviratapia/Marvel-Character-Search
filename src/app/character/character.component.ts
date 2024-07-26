import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Character } from '../types/character';
import { Comic, DateElement } from '../types/comic';
import { CharacterService } from './character.service';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { NgClass } from '@angular/common';
import { HostListener } from '@angular/core';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinner,NgClass],
})
export class CharacterComponent implements OnInit {
  screenWidth: number = window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.screenWidth = window.innerWidth;
  }

  get containerClasses() {
    return {
      'container': true,
      'container--mobile': this.isMobileScreen(),
      'container--desktop': !this.isMobileScreen()
    };
  }

  isMobileScreen(): boolean {
    return this.screenWidth <= 600;
  }
  character: Character | undefined;
  comics: Comic[] | undefined;
  characterService = inject(CharacterService);
  route = inject(ActivatedRoute);
  loading = false;

  async ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const id = routeParams.get('id');
    if (id === null) {
      console.log('character Id is null');
      return;
    }
    let character = await this.characterService.GetCharacterFromAPI(id);

    if (character === undefined) {
      console.log('character not found');
      
      return;
    }

    this.character = character;
    let comics = await this.characterService.GetCharacterComicsFromAPI(id);
    if (comics === undefined) {
      console.log('comics not found');
      return;
    }

    for (let comic of comics) {
      comic.dates.map((date: DateElement) => {
        date.date = date.date.split('T')[0];
      });
    }

    // return all dates that are correct and that don't begin with a negative year
    comics = comics.filter((comic) => {
      for (let date of comic.dates) {
        if (date.type === 'onsaleDate') {
          return parseInt(date.date) > 0;
        }
      }
      return false;
    });

    comics.sort((comicA, comicB) => {
      let dateA = '';
      let dateB = '';
      for (let date of comicA.dates) {
        if (date.type === 'onsaleDate') {
          dateA = date.date;
          break;
        }
      }
      for (let date of comicB.dates) {
        if (date.type === 'onsaleDate') {
          dateB = date.date;
          break;
        }
      }
      return new Date(dateA).getFullYear() - new Date(dateB).getFullYear();
    });

    this.comics = comics;
  }
}
