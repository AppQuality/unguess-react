import {
  AccordionNew,
  Checkbox,
  FormField as Field,
  MD,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { DeviceFilterType } from 'src/features/bugsPage/deviceFilter';
import { LabelSpaceBetween, disabledStyle } from './LabelWithCounter';
import { ShowMore } from './ShowMore';
import { useFilterData } from './useFilterData';

export const DeviceField = ({
  devices,
  maxItemsToShow = 5,
}: {
  devices: DeviceFilterType['devices'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const { counters } = useFilterData('devices');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = devices;

  if (!counters) return null;

  return (
    <>
      <AccordionNew
        level={3}
        defaultExpandedSections={[]}
        className="bugs-drawer-accordion-devices"
        isCompact
      >
        <AccordionNew.Section>
          <AccordionNew.Header>
            <AccordionNew.Label
              label={t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_TITLE')}
              subtitle={
                selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.device)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_ALL_LABEL')
              }
            />
          </AccordionNew.Header>
          <AccordionNew.Panel>
            {available.length
              ? available
                  .slice(0, showMore ? undefined : maxItemsToShow)
                  .map((device) => (
                    <Field
                      style={{ marginBottom: appTheme.space.xs }}
                      className="bugs-drawer-accordion-device"
                    >
                      <Checkbox
                        value={device.device}
                        name="filter-devices"
                        disabled={!counters[device.device]}
                        checked={selected
                          .map((i) => i.device)
                          .includes(device.device)}
                        onChange={() => {
                          dispatch(
                            updateFilters({
                              filters: {
                                devices: [
                                  ...(selected
                                    .map((i) => i.device)
                                    .includes(device.device)
                                    ? selected.filter(
                                        (i) => i.device !== device.device
                                      )
                                    : [
                                        ...selected,
                                        {
                                          device: device.device,
                                        },
                                      ]),
                                ],
                              },
                            })
                          );
                        }}
                      >
                        <LabelSpaceBetween
                          isRegular
                          style={{
                            color: appTheme.palette.grey[700],
                            textTransform: 'capitalize',
                            ...(!counters[device.device] && disabledStyle),
                          }}
                        >
                          {device.device}
                          <MD>{counters[device.device] || 0}</MD>
                        </LabelSpaceBetween>
                      </Checkbox>
                    </Field>
                  ))
              : null}
            {available.length > maxItemsToShow ? (
              <ShowMore
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {!showMore ? (
                  <Trans
                    count={available.length - maxItemsToShow}
                    i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_SHOW_MORE_LABEL"
                    values={{
                      count: available.length - maxItemsToShow,
                    }}
                    components={{
                      span: <Span isBold />,
                    }}
                    defaults="Show <span>{{count}}</span> more devices"
                  />
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_SHOW_LESS_LABEL'
                  )
                )}
              </ShowMore>
            ) : null}
          </AccordionNew.Panel>
        </AccordionNew.Section>
      </AccordionNew>
      <Divider />
    </>
  );
};
