export interface WhereAppStep {
    iOSLink?: string;
    androidLink?: string;
    isIOS?: boolean;
    isAndroid?: boolean; 
    withSmartphone?: boolean;
    withTablet?: boolean;
    hasOutOfScope?: boolean;
    outOfScope?: string;
}