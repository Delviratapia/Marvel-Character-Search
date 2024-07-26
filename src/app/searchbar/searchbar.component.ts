import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="search-bar">
      <div class="searchbar-items">
        <input type="text" placeholder="Search" (input)="onSearch($event)" />
        <button class="search-button">
          <span class="material-icons">search</span>
        </button>
      </div>
    </div>
  `,
  styles: `

@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

  :host{
    
    height:10%

  }

  .searchbar-items {
    
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f0f0f0;
      border-radius: 30px;
      padding: 0 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      max-width: 600px;
      margin: auto;
      
    }

    .search-bar {
      
      display: flex;
      height:10vh;
      justify-content: center;
      align-items: center;
    }

    input[type="text"] {
      
      flex: 1;
      border: none;
      background: none;
      outline: none;
      padding: 10px;
      color: #333;
      font-size: 16px;
    }

    .search-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .material-icons {
      
      color: #666;
      font-size: 24px;
    }


  `,
})
export class SearchbarComponent {
  timeout: any;
  keyUpWait = 1000;
  @Output() searchEvent = new EventEmitter<string>();

  onSearch(event: any) {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }

    this.timeout = setTimeout(() => {
      const query = event.target.value;
      this.searchEvent.emit(query); // Emit the search query to the parent component
    }, this.keyUpWait);
  }
}
