import { ChangeDetectionStrategy, Component, Input , HostListener} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Character } from '../types/character';
import { NgClass } from '@angular/common';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-card',
  template: `
    <div routerLink="character/{{ character.id }}" class="card" [ngClass]="containerClasses">
      <div class="card-image"></div>
      <div class="card-content">
        <p>{{ character.name }}</p>

        <p><strong>Date</strong></p>
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
