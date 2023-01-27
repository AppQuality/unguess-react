import {
  Accordion,
  Anchor,
  Checkbox,
  Label,
  MD,
  SM,
  Span,
} from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import { Field } from '@zendeskgarden/react-forms';
import { updateFilters } from 'src/features/bugsPage/bugsPageSlice';
import { Divider } from 'src/common/components/divider';
import styled from 'styled-components';
import { DeviceFilterType } from 'src/features/bugsPage/deviceFilter';

const ShowMore = styled(Anchor)`
  display: block;
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  color: ${({ theme }) => theme.colors.primaryHue};
  padding-left: ${({ theme }) => theme.space.base * 6}px;
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const DeviceField = ({
  devices,
  maxItemsToShow = 5,
}: {
  devices: DeviceFilterType['devices'];
  maxItemsToShow?: number;
}) => {
  const [showMore, setShowMore] = useState(false);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { available, selected } = devices;

  return (
    <>
      <Accordion level={3}>
        <Accordion.Section>
          <Accordion.Header>
            <Accordion.Label>
              <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
                {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_TITLE')}
              </MD>
              <SM
                style={{
                  color: globalTheme.palette.grey[600],
                  textTransform: 'capitalize',
                }}
              >
                {selected && selected.length
                  ? `${selected
                      .slice(0, maxItemsToShow)
                      .map((item) => item.device)
                      .join(', ')
                      .toLowerCase()} ${
                      selected.length > maxItemsToShow
                        ? `+${selected.length - maxItemsToShow}`
                        : ''
                    }`
                  : t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_ALL_LABEL')}
              </SM>
            </Accordion.Label>
          </Accordion.Header>
          <Accordion.Panel>
            {available
              .slice(0, showMore ? undefined : maxItemsToShow)
              .map((device) => (
                <Field style={{ marginBottom: globalTheme.space.xs }}>
                  <Checkbox
                    value={device.device}
                    name="filter-devices"
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
                    <Label
                      isRegular
                      style={{
                        color: globalTheme.palette.grey[600],
                        textTransform: 'capitalize',
                      }}
                    >
                      {device.device}
                    </Label>
                  </Checkbox>
                </Field>
              ))}
            {available.length > maxItemsToShow && (
              <ShowMore
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                {!showMore ? (
                  <Trans i18nKey="__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_SHOW_MORE_LABEL">
                    Show{' '}
                    <Span isBold>
                      {{
                        devices: available.length - maxItemsToShow,
                      }}
                    </Span>{' '}
                    more devices
                  </Trans>
                ) : (
                  t(
                    '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_SHOW_LESS_LABEL'
                  )
                )}
              </ShowMore>
            )}
          </Accordion.Panel>
        </Accordion.Section>
      </Accordion>
      <Divider />
    </>
  );
};
