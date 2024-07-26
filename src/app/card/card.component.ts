import { ChangeDetectionStrategy, Component, Input , HostListener} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Character } from '../types/character';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-card',
  template: `
    <div routerLink="character/{{ character.id }}" class="card" [ngClass]="containerClasses">
      <img src="{{ character.thumbnail.path }}.{{ character.thumbnail.extension }}" class="card-image"/>
      <div class="card-content">
        <p>{{ character.name }}</p>
        <p><strong>Modified Date: {{ character.modified.split("T")[0] }}</strong></p>
      </div>
    </div>
  `,
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink, NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
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


  @Input() character!: Character;
}
