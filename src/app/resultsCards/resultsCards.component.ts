import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "../card/card.component";


@Component({
  selector: 'app-resultsCard',
  standalone: true,
  imports: [RouterOutlet, CardComponent],
  template: `

    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>
    <app-card/>

  
  `,

styles: `


:host {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width:80%;
  max-height: 90%

}

`,

})


export class ResultsCardComponent {
    

}
