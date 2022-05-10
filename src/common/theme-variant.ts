import { theme } from "@appquality/unguess-design-system";

const customTheme =  {
    ...theme,
    colors: {
      ...theme.colors,
      primaryHue: theme.palette.water[600],
    },
  };

export default customTheme;
