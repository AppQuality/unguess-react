import { WizardModel } from "./wizardModel";

const values: WizardModel = {
    campaign_name: "campaign name",
    campaign_reason: "reason-a",
    product_type: "mobileapp",
    withSmartphone: true,
    withDesktop: true,
    withTablet: false,
    customBrowser: false,
    customBrowserFilled: false,
    withChrome: false,
    withSafari: false,
    withFirefox: false,
    withEdge: false,
    hasOutOfScope: false,
    outOfScope: "",
    iOSLink: "https://www.figma.com/",
    androidLink: "",
    isIOS: true,
    isAndroid: false,
    campaign_language: "en",
    campaign_date: new Date(),
}

export default values;