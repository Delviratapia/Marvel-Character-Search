import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ResultsCardComponent } from '../resultsCards/resultsCards.component';
import { CharacterService } from '../character/character.service';
import { Character } from '../character/character';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [RouterOutlet, SearchbarComponent, ResultsCardComponent],
  template: `
    <app-searchbar (searchEvent)="handleSearch($event)" />
    <app-resultsCard [characters]="filteredCharacters" [length]="filteredCharacters.length" />
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  title = 'angularMarvelApp';

  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  charactersService = inject(CharacterService);

  async ngOnInit() {
    this.characters = await this.charactersService.GetCharacters();
  }

  handleSearch(query: string) {
    if(query.length === 0) {
      this.filteredCharacters = []
      return
    }
    this.filteredCharacters = this.characters.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
