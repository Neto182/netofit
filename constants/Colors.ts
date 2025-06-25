// constants/Colors.ts
export const Colors = {
  light: {
    primary: '#2f95dc',
    background: '#fff',
    cardBackground: '#f8f8f8',
    border: '#eee',
    text: '#000',
    secondaryText: '#666',
  },
  dark: {
    primary: '#0a84ff',
    background: '#000',
    cardBackground: '#1c1c1e',
    border: '#333',
    text: '#fff',
    secondaryText: '#aaa',
  },
};

export type ColorScheme = keyof typeof Colors;