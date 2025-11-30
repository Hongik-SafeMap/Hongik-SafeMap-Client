export const colors = {
  gray50: '#f2f2f2',
  gray100: '#d9d9d9',
  gray200: '#bfbfbf',
  gray300: '#a6a6a6',
  gray400: '#8c8c8c',
  gray500: '#737373',
  gray600: '#595959',
  gray700: '#404040',
  gray800: '#262626',
  gray900: '#0d0d0d',
  white: '#ffffff',
  black: '#000000',
};

export const font = {
  fontSize: {
    text24: '24px',
    text22: '22px',
    text20: '20px',
    text18: '18px',
    text16: '16px',
    text14: '14px',
    text13: '13px',
    text12: '12px',
    text10: '10px',
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
};

export type ColorTypes = typeof colors;
export type FontTypes = typeof font;

export const theme = {
  colors,
  font,
};
