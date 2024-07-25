import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from "../card/card.component";
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import { Character } from '../character/character';
import { CharacterService } from '../character/character.service';



@Component({
  selector: 'app-resultsCard',
  standalone: true,
  imports: [RouterOutlet, CardComponent, MatPaginatorModule],
  template: `

<div class="card-container">

  @for(ch of characters.slice(pageStart(), pageStart()+pageSize); track characters) {
    <app-card [name]="ch.name" />
  }
      
</div>

    
<!-- TODO: fix so it stays in the bottom, not to the right of the cards -->
<div class="paginator-container">
  <mat-paginator 
  (page)="handlePageEvent($event)"
  [length]="length"
  [pageSize]="pageSize"
  [pageIndex]="pageIndex"
  />

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
  characters: Character[] = [];
  charactersService = inject(CharacterService)

  pageEvent: PageEvent | undefined;
  length = 0
  pageSize = 5
  pageIndex = 0

  handlePageEvent(event: PageEvent){
    this.pageEvent = event
    this.length = event.length
    this.pageSize = event.pageSize
    this.pageIndex = event.pageIndex
  }

  pageStart(): number {
    return this.pageIndex * this.pageSize
  }

  async ngOnInit() {
    this.characters = await this.charactersService.GetCharacters()
    this.length = this.characters.length
  }
    

}
