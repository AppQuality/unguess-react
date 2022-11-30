// import {Tabs} from "@appquality/unguess-design-system";
import { BasicWidget } from '../widgetCards/BasicWidget';

const IncomingBugs = () => (
  <BasicWidget>
    <BasicWidget.Header tooltipContent="tooltip">
      incoming bugs
    </BasicWidget.Header>

    <BasicWidget.Footer>vai al dettaglio dei bug</BasicWidget.Footer>
  </BasicWidget>
);

export default IncomingBugs;
