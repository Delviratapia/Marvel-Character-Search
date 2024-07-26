import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ResultsCardComponent } from '../resultsCards/resultsCards.component';
import { CharacterService } from '../character/character.service';
import { Character } from '../character/character';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    SearchbarComponent,
    ResultsCardComponent,
    MatProgressSpinnerModule,
  ],
  template: `
    <app-searchbar (searchEvent)="handleSearch($event)" />
    @if(loading) {
    <mat-spinner></mat-spinner>
    }
    <app-resultsCard
      [characters]="filteredCharacters"
      [length]="filteredCharacters.length"
    />
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  title = 'angularMarvelApp';
  loading = false;

  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  charactersService = inject(CharacterService);

  async ngOnInit() {
    const lastSearch = this.getLastSearch();
    if (lastSearch !== undefined) {
      this.filteredCharacters = lastSearch;
    }
  }

  async handleSearch(query: string) {
    if (query.length === 0) {
      this.filteredCharacters = [];
      return;
    }
    this.loading = true;
    this.filteredCharacters = await this.charactersService.GetCharactersFromAPI(
      query
    );
    this.loading = false;
    // this.filteredCharacters = this.characters.filter((item) =>
    //   item.name.toLowerCase().includes(query.toLowerCase())
    // );
    this.setLastSearch(this.filteredCharacters);
  }

  // remember state when changing pages
  getLastSearch(): Character[] | undefined {
    const lastSearchJson = localStorage.getItem('lastSearch');
    if (lastSearchJson === null) {
      return undefined;
    }

    const lastSearch = JSON.parse(lastSearchJson);
    localStorage.removeItem('lastSearch');
    return lastSearch;
  }

  setLastSearch(search: Character[]) {
    if (search.length === 0) {
      return;
    }
    localStorage.setItem('lastSearch', JSON.stringify(search));
  }
}
