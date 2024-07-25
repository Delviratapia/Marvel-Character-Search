import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Character } from '../character/character';

/**
 * @title Card with multiple sections
 */
@Component({
  selector: 'app-card',
  template: `
    <div routerLink="character/{{character.id}}" class="card">
      <div class="card-image"></div>
      <div class="card-content">
        <p>{{ character.name }}</p>
         
        <p><strong>Date</strong></p>
      </div>
    </div>
  `,
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() character!: Character
}
