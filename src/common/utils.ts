export const prepareGravatar = (url: string, size?: number) =>
  url + `?s=${size || 48}`;

export const toggleChat = (open: boolean) => {
  if (typeof customerly !== undefined) {
    if (open) {
      customerly.show();
    } else {
      customerly.hide();
    }
  }
};

export const isMinMedia = (breakpoint: string) => {
    return window.matchMedia(`only screen and (min-width: ${breakpoint})`).matches;
}

export const isMaxMedia = (breakpoint: string) => {
    return window.matchMedia(`only screen and (max-width: ${breakpoint})`).matches;
}