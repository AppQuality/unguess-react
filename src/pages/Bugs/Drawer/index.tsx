import {
  Accordion,
  Button,
  Drawer,
  MD,
  SM,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from 'src/app/hooks';
import { theme as globalTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { setFilterDrawerOpen } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';

export const WaterButton = styled(Button)``;

WaterButton.defaultProps = {
  themeColor: globalTheme.palette.water[600],
};

const AccordionLabel = styled(MD)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const BugsFilterDrawer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isFilterDrawerOpen } = useAppSelector((state) => state.bugsPage);
  const bugsCount = 99;

  const onClose = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onCtaClick = () => {
    dispatch(setFilterDrawerOpen(false));
  };

  const onCancelClick = () => {
    console.log('reset filters');
  };

  return (
    <Drawer isOpen={isFilterDrawerOpen} onClose={onClose} restoreFocus={false}>
      <Drawer.Header>
        {t('__BUGS_PAGE_FILTER_DRAWER_HEADER_TITLE')}
      </Drawer.Header>
      <Drawer.Body>
        <>
          <MD
            isBold
            style={{
              color: globalTheme.palette.grey[600],
              marginBottom: globalTheme.space.sm,
            }}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_BODY_COMMON_LABEL')}
          </MD>
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t(
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DUPLICATES_TITLE'
                    )}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_SEVERITY_TITLE')}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TYPOLOGY_TITLE')}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_TITLE')}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
        </>
        <>
          <MD
            isBold
            style={{
              color: globalTheme.palette.grey[600],
              marginBottom: globalTheme.space.sm,
              marginTop: globalTheme.space.md,
            }}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_BODY_ACTIONS_LABEL')}
          </MD>
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_TAGS_TITLE')}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
        </>
        <>
          <MD
            isBold
            style={{
              color: globalTheme.palette.grey[600],
              marginBottom: globalTheme.space.sm,
              marginTop: globalTheme.space.md,
            }}
          >
            {t('__BUGS_PAGE_FILTER_DRAWER_BODY_BUG_LABEL')}
          </MD>
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t(
                      '__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_REPLICABILITY_TITLE'
                    )}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_DEVICE_TITLE')}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_OS_TITLE')}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
          <Accordion level={3}>
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label>
                  <AccordionLabel isBold>
                    {t('__BUGS_PAGE_FILTER_DRAWER_BODY_FILTER_USECASE_TITLE')}
                  </AccordionLabel>
                  <SM style={{ color: globalTheme.palette.grey[600] }}>
                    Value
                  </SM>
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>Options</Accordion.Panel>
            </Accordion.Section>
          </Accordion>
          <Divider />
        </>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button id="" isPill onClick={onCancelClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_CANCEL_BUTTON')}
          </Button>
        </Drawer.FooterItem>
        <Drawer.FooterItem>
          <WaterButton id="" isPrimary isPill onClick={onCtaClick}>
            {t('__BUGS_PAGE_FILTER_DRAWER_CONFIRM_BUTTON')} ({bugsCount})
          </WaterButton>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close id="" onClick={onClose} />
    </Drawer>
  );
};

export { BugsFilterDrawer };
