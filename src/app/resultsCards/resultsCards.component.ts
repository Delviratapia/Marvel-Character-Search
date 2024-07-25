import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "../card/card.component";
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';



@Component({
  selector: 'app-resultsCard',
  standalone: true,
  imports: [RouterOutlet, CardComponent, MatPaginatorModule],
  template: `

<div class="card-container">

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
      
</div>

    
<div class="paginator-container">

  <mat-paginator/>

</div>

  
  `,

styles: `


:host {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width:80%;
  max-height: 100%
  

}

.paginator-container{

  background-color: #f0f0f0;
  border-radius: 10px;
  margin: 2rem;
  padding:5px;

}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
 

  
}


`,

})


export class ResultsCardComponent {
    

}
