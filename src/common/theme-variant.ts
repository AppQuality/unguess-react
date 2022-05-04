import { theme } from "@appquality/unguess-design-system";

const customTheme =  {
    ...theme,
    colors: {
      ...theme.colors,
      primaryHue: theme.palette.teal[600],
    },
  };

export default customTheme;
