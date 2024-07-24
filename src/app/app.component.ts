import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CardComponent } from "./card/card.component";
import { SearchbarComponent } from './searchbar/searchbar.component';
import { ResultsCardComponent } from "./resultsCards/resultsCards.component";

import { ProfileCardComponent} from './profile-card/profile-card.component';


@Component({
  selector: 'app-root',
  standalone: true,

  imports: [RouterOutlet, CardComponent, SearchbarComponent, ResultsCardComponent, ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angularMarvelApp';
}
