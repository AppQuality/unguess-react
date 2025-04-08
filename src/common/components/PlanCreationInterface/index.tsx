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
  UnorderedList,
} from '@appquality/unguess-design-system';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { isTemplateTailored } from 'src/common/isTemplateTailored';
import {
  CpReqTemplate,
  Module,
  ModuleTouchpoints,
  ModuleTask,
  usePostWorkspacesByWidPlansMutation,
} from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { PlanCreationContextProvider, usePlanCreationContext } from './Context';
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

export interface PlanCreationProps {
  isOpen: boolean;
  onClose: () => void;
  template: CpReqTemplate;
}

const firstLetterUpperCase = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1);

interface ExtendedTemplate extends CpReqTemplate {
  isTailored: boolean;
  requirementsItems?: { value: string; id: string }[];
}

const DrawerFooter = ({
  selectedTemplate,
}: {
  selectedTemplate: ExtendedTemplate;
}) => {
  const { setFieldIsTouched, projectId } = usePlanCreationContext();
  const navigate = useNavigate();
  const { activeWorkspace } = useActiveWorkspace();
  const [createPlan] = usePostWorkspacesByWidPlansMutation();
  const plansRoute = useLocalizeRoute('plans');
  const { t } = useTranslation();
  const location = useLocation();
  const { templateId } = useParams();

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

  const infoPath = useMemo(
    () => location.pathname.split('/').slice(0, -1).join('/'),
    [location.pathname]
  );
  const shouldSeeInfoButton = useMemo(
    () =>
      !selectedTemplate.isTailored &&
      location.pathname !== infoPath &&
      !templateId,
    [selectedTemplate.isTailored, location.pathname, infoPath, templateId]
  );

  return (
    <Drawer.Footer>
      <Drawer.FooterItem>
        {shouldSeeInfoButton && (
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
  );
};

const TemplateContent = ({ data }: { data: CpReqTemplate }) => {
  const { t } = useTranslation();

  const taskModule: ModuleTask | undefined = JSON.parse(
    data.config
  ).modules.find((module: Module) => module.type === 'tasks');

  const touchPointModule: ModuleTouchpoints | undefined = JSON.parse(
    data.config
  ).modules.find((module: Module) => module.type === 'touchpoints');

  const devices =
    touchPointModule?.output?.reduce(
      (acc: string[], item: { form_factor: string }) => {
        if (!acc.includes(item.form_factor)) {
          acc.push(item.form_factor);
        }
        return acc;
      },
      []
    ) || [];

  const tasks = Object.entries(
    taskModule?.output?.reduce(
      (
        acc: { [key: string]: { key: string; count: number } },
        item: { kind: string }
      ) => {
        if (!(item.kind in acc)) {
          acc[item.kind] = { key: item.kind, count: 0 };
        }
        acc[item.kind].count += 1;
        return acc;
      },
      {}
    ) || {}
  ).map(([, value]) => value);

  const taskCount = tasks.map((task) => task.count).reduce((a, b) => a + b, 0);

  if (!taskModule && !touchPointModule) return null;

  return (
    <RequirementsContainer>
      <MD
        style={{ marginBottom: appTheme.space.xs }}
        color={getColor(appTheme.colors.accentHue, 700)}
        isBold
      >
        {t('__TEMPLATES_DRAWER_REQUIREMENTS_TAILORED_LABEL')}
      </MD>
      {!!devices.length && (
        <>
          <SM
            color={appTheme.palette.grey[700]}
            style={{ marginBottom: appTheme.space.xs }}
            isBold
          >
            {t('__TEMPLATES_DRAWER_CONTENT_DEVICES_LABEL')}
          </SM>
          <UnorderedList style={{ marginBottom: appTheme.space.md }}>
            {devices.map((dev) => (
              <UnorderedList.Item key={`${dev}`}>
                <SM>{firstLetterUpperCase(dev)}</SM>
              </UnorderedList.Item>
            ))}
          </UnorderedList>
        </>
      )}
      {!!tasks.length && (
        <>
          <SM
            color={appTheme.palette.grey[700]}
            style={{ marginBottom: appTheme.space.xs }}
            isBold
          >
            {t('__TEMPLATES_DRAWER_CONTENT_TASKS_LABEL')}
          </SM>
          <SM>
            <Trans
              count={taskCount}
              i18nKey="__TEMPLATES_DRAWER_CONTENT_TASKS_TOTALS"
            >
              {{ count: taskCount }} total tasks of which:
            </Trans>
          </SM>
          <UnorderedList style={{ marginBottom: appTheme.space.sm }}>
            {tasks.map((task) => (
              <UnorderedList.Item key={`${task.key}`}>
                <SM>
                  {task.count} {firstLetterUpperCase(task.key)}
                </SM>
              </UnorderedList.Item>
            ))}
          </UnorderedList>
        </>
      )}
    </RequirementsContainer>
  );
};

export const NewPlanDrawer = ({
  onClose,
  isOpen,
  template,
}: PlanCreationProps) => {
  const { t } = useTranslation();

  const handleClose = () => {
    onClose();
  };

  const selectedTemplate = useMemo(
    () => ({
      ...template,
      isTailored: isTemplateTailored(template),
      requirementsItems: template.strapi?.requirements?.list.map(
        (requirement) => ({ value: requirement, id: uuidv4() })
      ),
    }),
    [template]
  );

  if (!template) {
    return null;
    // todo: handle this case properly
  }

  const targetModule: { output: string } | undefined = JSON.parse(
    selectedTemplate.config
  ).modules.find((module: any) => module.type === 'target');

  return (
    <PlanCreationContextProvider>
      <Drawer
        data-qa="plan-creation-interface"
        isOpen={isOpen}
        onClose={handleClose}
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
            {selectedTemplate.strapi?.description ||
              selectedTemplate.description}
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
              <Tag key={tag.text}>
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
          {(selectedTemplate.requirementsItems ?? []).length > 0 ? (
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
              <SM
                color={appTheme.palette.grey[700]}
                style={{ marginBottom: appTheme.space.xs }}
              >
                {t('__TEMPLATES_DRAWER_REQUIREMENTS_LABEL2')}
              </SM>
              <ul>
                {selectedTemplate.requirementsItems?.map((req) => (
                  <li key={req.id}>
                    <SM>{req.value}</SM>
                  </li>
                ))}
              </ul>
            </RequirementsContainer>
          ) : (
            <TemplateContent data={selectedTemplate} />
          )}
        </Drawer.Body>
        <DrawerFooter selectedTemplate={selectedTemplate} />
        <Drawer.Close data-qa="close-button" onClick={onClose} />
      </Drawer>
    </PlanCreationContextProvider>
  );
};

export default NewPlanDrawer;
