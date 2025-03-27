import {
  Button,
  Drawer,
  getColor,
  LG,
  MD,
  Separator,
  SM,
  Tag,
  TemplateCard,
  theme,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { usePostWorkspacesByWidPlansMutation } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { useTemplatesContext } from './Context';
import { ProjectDropdown } from './ProjectDropdown';

const TagContainer = styled.div`
  padding-bottom: ${theme.space.md};
`;

const DropdownContainer = styled.div`
  padding-top: ${theme.space.md};
  ${MD} {
    margin-bottom: ${theme.space.xxs};
  }
  margin-bottom: ${theme.space.lg};
`;

const RequirementsContainer = styled.div`
  border-color: ${theme.palette.grey[200]};
  border-style: solid;
  border-width: 1px;
  border-radius: ${theme.borderRadii.md};
  padding: ${theme.space.sm};
  background-color: ${theme.palette.grey[100]};
  ul {
    list-style: disc;
    padding-left: ${theme.space.sm};
  }
  li::marker {
    font-size: ${theme.fontSizes.xs};
  }
`;

export const NewPlanDrawer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeWorkspace } = useActiveWorkspace();
  const {
    setIsDrawerOpen,
    isDrawerOpen,
    selectedTemplate,
    setFieldIsTouched,
    projectId,
  } = useTemplatesContext();
  const onClose = () => {
    setIsDrawerOpen(false);
  };
  const [createPlan] = usePostWorkspacesByWidPlansMutation();
  const plansRoute = useLocalizeRoute('plans');

  if (!selectedTemplate) {
    return null;
    // todo: handle this case properly
  }

  const targetModule: { output: string } | undefined = JSON.parse(
    selectedTemplate.config
  ).modules.find((module: any) => module.type === 'target');

  const handleConfirm = async () => {
    setFieldIsTouched(true);
    if (projectId === null) return;

    await createPlan({
      wid: activeWorkspace?.id.toString() ?? '',
      body: {
        template_id: selectedTemplate.id,
        project_id: projectId,
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

  return (
    <Drawer
      data-qa="plan-creation-interface"
      isOpen={isDrawerOpen}
      onClose={() => {
        onClose();
      }}
      restoreFocus={false}
      focusOnMount={false}
    >
      <Drawer.Header>
        <TemplateCard.Meta
          i18n={{
            tailoredHeader: t('__TEMPLATE_CARD_TAILORED_HEADER'),
            unguessHeader: t('__TEMPLATE_CARD_UNGUESS_HEADER'),
          }}
          isTailored={selectedTemplate.isTailored}
        />
      </Drawer.Header>
      <Drawer.Body>
        <LG isBold style={{ marginBottom: theme.space.xs }}>
          {selectedTemplate.strapi?.title || selectedTemplate.name}
        </LG>
        <SM
          color={theme.palette.grey[700]}
          style={{ marginBottom: theme.space.sm }}
        >
          {selectedTemplate.strapi?.description || selectedTemplate.description}
        </SM>
        <TagContainer>
          {'price' in selectedTemplate &&
            typeof selectedTemplate.price === 'string' && (
              <TemplateCard.PriceTag text={selectedTemplate.price} />
            )}
          {targetModule?.output && (
            <TemplateCard.UserTag text={targetModule.output} />
          )}

          {selectedTemplate.strapi?.tags.map((tag) => (
            <Tag>
              <Tag.Avatar>
                <img src={tag.icon} alt={tag.text} />
              </Tag.Avatar>
              {tag.text}
            </Tag>
          ))}
        </TagContainer>
        <Separator />
        <DropdownContainer>
          <MD isBold>{t('__TEMPLATES_DRAWER_PROJECT_DROPDOWN_LABEL')}</MD>
          <ProjectDropdown />
        </DropdownContainer>
        <RequirementsContainer>
          <MD
            style={{ marginBottom: appTheme.space.xs }}
            color={getColor(appTheme.colors.accentHue, 700)}
            isBold
          >
            {selectedTemplate.isTailored
              ? t('__TEMPLATES_DRAWER_REQUIREMENTS_TAILORED_LABEL')
              : t('__TEMPLATES_DRAWER_REQUIREMENTS_LABEL')}
          </MD>
          {!selectedTemplate.isTailored && (
            <SM
              color={appTheme.palette.grey[700]}
              style={{ marginBottom: appTheme.space.xs }}
            >
              {t('__TEMPLATES_DRAWER_REQUIREMENTS_LABEL2')}
            </SM>
          )}
          <ul>
            {selectedTemplate.requirementsItems?.map((req) => (
              <li key={req.id}>
                <SM>{req.value}</SM>
              </li>
            ))}
          </ul>
        </RequirementsContainer>
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          {!selectedTemplate.isTailored && (
            <Button
              style={{ marginRight: `${theme.space.md}` }}
              isPrimary
              isLink
              onClick={() => {
                navigate(`/templates/${selectedTemplate.id}`);
              }}
            >
              {t('__TEMPLATES_DRAWER_FOOTER_INFO_BUTTON')}
            </Button>
          )}
          <Button
            isPrimary
            isAccent
            onClick={() => {
              handleConfirm();
            }}
          >
            {t('__TEMPLATES_DRAWER_FOOTER_CONFIRM_BUTTON')}
          </Button>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close data-qa="close-button" onClick={onClose} />
    </Drawer>
  );
};
