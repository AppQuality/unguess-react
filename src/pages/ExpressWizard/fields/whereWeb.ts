export interface WhereWebStep {
  link?: string;

  withSmartphone?: boolean;
  withTablet?: boolean;
  withDesktop?: boolean;

  customBrowser?: boolean;
  customBrowserFilled?: boolean;
  withChrome?: boolean;
  withSafari?: boolean;
  withFirefox?: boolean;
  withEdge?: boolean;
  hasOutOfScope?: boolean;
  outOfScope?: string;
}
