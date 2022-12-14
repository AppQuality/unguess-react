const openUrl = (url: string, options?: { newTab: boolean }): void => {
  // eslint-disable-next-line security/detect-non-literal-fs-filename
  window.open(url, options && options.newTab ? '_blank' : undefined);
};

export { openUrl };
