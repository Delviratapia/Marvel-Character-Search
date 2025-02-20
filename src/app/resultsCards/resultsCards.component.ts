import { Component, inject, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { Character } from '../types/character';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-resultsCard',
  standalone: true,
  imports: [RouterOutlet, CardComponent, MatPaginatorModule],
  template: `
    <div class="card-container">
      @for(ch of characters.slice(pageStart(), pageStart()+pageSize); track
      characters) {
      <app-card [character]="ch" />
      }
    </div>

    @if(charactersLength !== 0) {
    <div class="paginator-container">
      <mat-paginator
        (page)="handlePageEvent($event)"
        [length]="charactersLength"
        [pageSize]="pageSize"
        [pageIndex]="pageIndex"
      />
    </div>
    }
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
  margin: 1rem;
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
  @Input() characters: Character[] = [];
  @Input() charactersLength: number = 0;
  pageEvent: PageEvent | undefined;
  pageSize = 5;
  pageIndex = 0;

  handlePageEvent(event: PageEvent) {
    this.pageEvent = event;
    this.charactersLength = event.length;
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }

  pageStart(): number {
    return this.pageIndex * this.pageSize;
  }
}
