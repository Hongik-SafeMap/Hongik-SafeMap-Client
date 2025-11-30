import 'styled-components';
import type { ColorTypes, FontTypes } from '@/style/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ColorTypes;
    font: FontTypes;
  }
}
