import { useFormikContext } from 'formik';
import { Trans, useTranslation } from 'react-i18next';
import { Button, MD, SM, Span } from '@appquality/unguess-design-system';
import { appTheme } from 'src/app/theme';
import styled from 'styled-components';
import { VideoTag } from 'src/features/api';
import { useMemo } from 'react';
import { InsightFormValues } from './FormProvider';
import { useInsightContext } from './InsightContext';

const FloatingContainer = styled.div`
  position: fixed;
  bottom: ${({ theme }) => theme.space.xxl};
  left: 50%;
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.levels.front};
  background-color: ${({ theme }) => theme.palette.blue[600]};
  color: white;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  border-radius: ${({ theme }) => theme.borderRadii.xxl};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  transition: all 0.3s ease-in-out;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ActionBar = () => {
  const { t } = useTranslation();
  const { values, setValues, resetForm } =
    useFormikContext<InsightFormValues>();
  const { isDrawerOpen, setIsDrawerOpen } = useInsightContext();

  const themesCount = useMemo(() => {
    const tags = values.observations.flatMap((obs) => obs.tags);
    const titles = tags.filter((tag) => tag.group.name === 'title');

    // Get count of unique titles (tag.name)
    const uniqueTitles = titles.reduce((acc, tag) => {
      if (!acc.find((_t) => _t.tag.name === tag.tag.name)) {
        acc.push(tag);
      }
      return acc;
    }, [] as VideoTag[]);

    return uniqueTitles.length;
  }, [values.observations]);

  // Do not show action bar cta if in editing or creating mode
  const hideCta = (values.id > 0 || values.id === -1) && isDrawerOpen;

  if (values.observations.length === 0) return null;

  return (
    <FloatingContainer>
      <Container>
        <div style={{ marginRight: appTheme.space.md }}>
          <MD>
            <Trans
              count={values.observations.length}
              i18nKey="__INSIGHTS_PAGE_ACTION_BAR_INSIGHTS_COUNT_OBSERVATIONS_LABEL"
            >
              Selected observations:
              <Span isBold>{{ observations: values.observations.length }}</Span>
            </Trans>
          </MD>
          <SM style={{ marginTop: appTheme.space.xs }}>
            <Trans
              count={values.observations.length}
              i18nKey="__INSIGHTS_PAGE_ACTION_BAR_INSIGHTS_COUNT_THEMES_LABEL"
            >
              Selected themes:
              <Span isBold>{{ themes: themesCount }}</Span>
            </Trans>
          </SM>
        </div>
        {!hideCta && (
          <div style={{ marginLeft: appTheme.space.md }}>
            <Button
              isLink
              size="small"
              onClick={() => {
                resetForm();
              }}
              style={{
                marginRight: appTheme.space.md,
                color: appTheme.palette.white,
              }}
            >
              {t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_CANCEL')}
            </Button>
            <Button
              isPrimary
              isAccent
              size="small"
              onClick={() => {
                setIsDrawerOpen(true);
                if (values.id === 0) {
                  setValues({
                    ...values,
                    id: -1,
                  });
                }
                if (values.id > 0) {
                  setValues(values);
                }
              }}
            >
              {values.id === 0 || values.id === -1
                ? t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_CREATE_INSIGHT')
                : t('__INSIGHTS_PAGE_ACTION_BAR_BUTTON_EDIT_INSIGHT')}
            </Button>
          </div>
        )}
      </Container>
    </FloatingContainer>
  );
};

export { ActionBar };
