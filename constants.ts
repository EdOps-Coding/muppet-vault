
import { Muppet, ShowInfo } from './types';

export const MUPPETS: Muppet[] = [
  {
    id: 'kermit',
    name: 'Kermit the Frog',
    performer: 'Jim Henson / Steve Whitmire / Matt Vogel',
    description: 'The level-headed (usually) producer and host of the show. He tries to keep the chaos organized.',
    imageUrl: 'https://picsum.photos/seed/kermit/400/400',
    firstAppearance: 'Sam and Friends (1955)',
    bestKnownFor: 'Being green, singing "Bein\' Green", and flailing his arms wildly.',
    era: 'Both'
  },
  {
    id: 'piggy',
    name: 'Miss Piggy',
    performer: 'Frank Oz / Eric Jacobson',
    description: 'A force of nature, glamorous star, and karate-chopping diva who loves Kermie.',
    imageUrl: 'https://picsum.photos/seed/piggy/400/400',
    firstAppearance: 'The Muppet Show (1976)',
    bestKnownFor: 'Moi, the karate chop, and her impeccable fashion sense.',
    era: 'Both'
  },
  {
    id: 'gonzo',
    name: 'Gonzo the Great',
    performer: 'Dave Goelz',
    description: 'The resident "whatever" and stuntman who finds beauty in the bizarre.',
    imageUrl: 'https://picsum.photos/seed/gonzo/400/400',
    firstAppearance: 'The Great Santa Claus Switch (1970)',
    bestKnownFor: 'Cannonballs, chickens, and his trumpet.',
    era: 'Both'
  },
  {
    id: 'fozzie',
    name: 'Fozzie Bear',
    performer: 'Frank Oz / Eric Jacobson',
    description: 'The hopelessly optimistic stand-up comedian whose jokes usually land with a thud.',
    imageUrl: 'https://picsum.photos/seed/fozzie/400/400',
    firstAppearance: 'The Muppet Show (1976)',
    bestKnownFor: 'Wocka Wocka Wocka! and his brown pork pie hat.',
    era: 'Both'
  },
  {
    id: 'animal',
    name: 'Animal',
    performer: 'Frank Oz / Eric Jacobson',
    description: 'The wild, beastly drummer of Dr. Teeth and the Electric Mayhem.',
    imageUrl: 'https://picsum.photos/seed/animal/400/400',
    firstAppearance: 'The Muppet Show (1976)',
    bestKnownFor: 'EAT! DRUMS! WOMAN!',
    era: 'Both'
  },
  {
    id: 'walter',
    name: 'Walter',
    performer: 'Peter Linz',
    description: 'The world\'s biggest Muppet fan turned actual Muppet performer.',
    imageUrl: 'https://picsum.photos/seed/walter/400/400',
    firstAppearance: 'The Muppets (2011)',
    bestKnownFor: 'Whistling and his intense Muppet fandom.',
    era: 'Modern'
  }
];

export const SHOWS: Record<'classic' | 'reboot', ShowInfo> = {
  classic: {
    title: 'The Muppet Show (1976-1981)',
    years: '1976-1981',
    format: 'Variety Show / Sketch Comedy',
    keyFeatures: ['Guest Stars', 'Backstage Chaos', 'Vaudeville Style sketches'],
    description: 'The original groundbreaking series that brought Jim Henson\'s creations to a global adult audience, set in a fictional theater.'
  },
  reboot: {
    title: 'Muppets Now (2020)',
    years: '2020-Present',
    format: 'Unscripted / Digital Shorts',
    keyFeatures: ['Social Media parody', 'Interactive segments', 'Modern celebrities'],
    description: 'A contemporary take focusing on the Muppets attempting to navigate the digital age and streaming culture.'
  }
};
