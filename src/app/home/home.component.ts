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
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  title = 'angularMarvelApp';

}
