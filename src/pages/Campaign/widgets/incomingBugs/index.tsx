import { BasicWidget } from '../widgetCards/BasicWidget';

const IncomingBugs = () => (
  <BasicWidget>
    <BasicWidget.Header tooltipContent="tooltip">
      incoming bugs
    </BasicWidget.Header>
    Tab Layout
    <BasicWidget.Footer>vai al dettaglio dei bug</BasicWidget.Footer>
  </BasicWidget>
);

export default IncomingBugs;
