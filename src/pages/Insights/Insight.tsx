import { Accordion, LG } from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { InsightFormValues } from './FormProvider';
import { InsightForm } from './InsightForm';

const Insight = ({ insight }: { insight: any }) => {
  const { values } = useFormikContext<InsightFormValues>();
  const isCurrent = values.id === insight.id;

  return (
    <>
      <Divider />
      <Accordion
        level={3}
        style={{ padding: `${appTheme.space.md} 0` }}
        key={`insight_accordion_${insight.id}_${isCurrent}`}
        defaultExpandedSections={isCurrent ? [0, 1] : []}
        id={`insight-accordion-${insight.id}`}
      >
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label style={{ padding: 0 }}>
              <LG isBold>{insight.title}</LG>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel style={{ padding: 0 }}>
            <InsightForm insight={insight} />
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
    </>
  );
};

export { Insight };
