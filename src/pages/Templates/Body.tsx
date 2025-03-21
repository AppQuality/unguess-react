import {
  Button,
  Col,
  Grid,
  MD,
  Row,
  SpecialCard,
  XXL,
  TemplateCard,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as GoToIcon } from 'src/assets/icons/edit-icon.svg';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  CpReqTemplate,
  useGetWorkspacesByWidTemplatesQuery,
  usePostWorkspacesByWidPlansMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useTemplatesContext } from './Context';
import { ProjectDropdown } from './ProjectDropdown';
import styled from 'styled-components';
import { useMemo } from 'react';
import { TemplateCardsGrid } from './TemplateCardsGrid';

const Body = () => {
  const { t } = useTranslation();
  const { projectId } = useTemplatesContext();
  const navigate = useNavigate();
  const { activeWorkspace } = useActiveWorkspace();
  const plansRoute = useLocalizeRoute('plans');
  const { data, isFetching, isLoading } = useGetWorkspacesByWidTemplatesQuery({
    wid: activeWorkspace?.id.toString() || '',
  });
  const [createPlan] = usePostWorkspacesByWidPlansMutation();
  // use array.reduce on data.items to filter templates in tailored and unguess, return an object with both arrays

  const CardsWrapper = styled.div`
    container-type: inline-size;
    container-name: cardsWrapper;
  `;

  const filteredTemplates = useMemo(() => {
    if (!data) return { tailored: [], unguess: [] };
    return data.items.reduce<{
      tailored: CpReqTemplate[];
      unguess: CpReqTemplate[];
    }>(
      (acc, template) => {
        if (
          'workspace_id' in template &&
          typeof template.workspace_id === 'number'
        ) {
          acc.tailored.push(template);
        } else {
          acc.unguess.push(template);
        }
        return acc;
      },
      { tailored: [], unguess: [] }
    );
  }, [data]);

  const handleButtonClick = async (tid: number, pid: number) => {
    await createPlan({
      wid: activeWorkspace?.id.toString() ?? '',
      body: {
        template_id: tid,
        project_id: pid,
      },
    })
      .unwrap()
      .then(({ id }) => {
        const planRoute = `${plansRoute}${id}`;
        navigate(planRoute);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  if (!data || isFetching || isLoading) return null;

  console.log(filteredTemplates);
  return (
    <LayoutWrapper>
      <Grid>
        <Row>
          <Col md={4}>
            <MD isBold style={{ marginBottom: appTheme.space.sm }}>
              {t('__TEMPLATES_PAGE_PROJECT_DROPDOWN_LABEL')}
            </MD>
            <ProjectDropdown />
          </Col>
        </Row>
      </Grid>
      <CardsWrapper>
        <XXL>{t('__TEMPLATES_PAGE_TAILORED_LIST_TITLE')}</XXL>
        <MD>{t('__TEMPLATES_PAGE_TAILORED_LIST_SUBTITLE')}</MD>
        <TemplateCardsGrid templates={filteredTemplates.tailored} />
        <XXL>{t('__TEMPLATES_PAGE_UNGUESS_LIST_TITLE')}</XXL>
        <MD>{t('__TEMPLATES_PAGE_UNGUESS_LIST_SUBTITLE')}</MD>
        <TemplateCardsGrid templates={filteredTemplates.unguess} />
      </CardsWrapper>
    </LayoutWrapper>
  );
};

export default Body;
