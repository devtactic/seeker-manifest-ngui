import { trigger, style, animate, transition, state } from '@angular/animations';

export const fadeVision = [
  trigger('fadeVisionTrigger', [
    state('in', style({ 'opacity': '1' })),
    state('out', style({ 'opacity': '0' })),
    transition('* <=> *', [
      animate('{{ fadeTime }}')
    ])
  ])
];
