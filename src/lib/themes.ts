export const themes = [
  {
    name: 'default',
    label: 'Default',
  },
  {
    name: 'rose',
    label: 'Rose',
  },
  {
    name: 'mint',
    label: 'Mint',
  },
  {
    name: 'golden',
    label: 'Golden',
  },
];

export type Theme = (typeof themes)[0];
export type ThemeName = Theme['name'];
