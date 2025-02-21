import {
  Button,
  Col,
  Grid,
  MD,
  Row,
  SpecialCard,
  XL,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as GoToIcon } from 'src/assets/icons/edit-icon.svg';
import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import {
  useGetWorkspacesByWidTemplatesQuery,
  usePostWorkspacesByWidPlansMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useTemplatesContext } from './Context';
import { ProjectDropdown } from './ProjectDropdown';

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
        <Row>
          <Col>
            <XL>{t('__TEMPLATES_PAGE_TEMPLATES_LIST_TITLE')}</XL>
          </Col>
        </Row>
        <Row>
          {data.items.map((template) => (
            <Col md={3}>
              <SpecialCard data-qa="template-card" key={template.id}>
                <SpecialCard.Thumb>#{template.id}</SpecialCard.Thumb>

                <SpecialCard.Header>
                  <SpecialCard.Header.Title>
                    {template.name}
                  </SpecialCard.Header.Title>
                </SpecialCard.Header>

                <SpecialCard.Footer>
                  <Button
                    isPrimary
                    isAccent
                    isStretched
                    disabled={!projectId}
                    onClick={() =>
                      handleButtonClick(template.id, projectId ?? 0)
                    }
                  >
                    <Button.StartIcon>
                      <GoToIcon />
                    </Button.StartIcon>
                    {t('__TEMPLATES_PAGE_TEMPLATE_CARD_BUTTON_LABEL')}
                  </Button>
                </SpecialCard.Footer>
              </SpecialCard>
            </Col>
          ))}
        </Row>
      </Grid>
    </LayoutWrapper>
  );
};

export default Body;
