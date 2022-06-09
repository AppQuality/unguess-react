import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from 'src/i18n';
import {
  Button,
  Col,
  InfoCard,
  Row,
  ServiceCard,
  theme,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/experiential-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import { WaterButton } from 'src/common/components/waterButton';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { openDrawer, openWizard } from 'src/features/express/expressSlice';
import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { toggleChat } from 'src/common/utils';
import { STRAPI_URL } from 'src/constants';

const ServicesContainer = styled.div``;

const ServiceCol = styled(Col)`
  margin-bottom: ${theme.space.lg};
`;

const CardGroup = ({ items }: { items: any }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const navigateToService = (serviceId: number) => {
    const localizedRoute =
      i18n.language === 'en'
        ? `/services/${serviceId}`
        : `/${i18n.language}/services/${serviceId}`;

    navigate(localizedRoute);
  };

  return (
    <>
      {items.map((service: any) => {
        const iconUrl = `${STRAPI_URL}${service.data.attributes?.icon?.data?.attributes?.url}`;
        const tags = [];
        const buttons = [];

        buttons.push(
          <Button
            isPill
            isStretched
            size="small"
            onClick={() => navigateToService(service.data.id)}
          >
            {t('__CATALOG_PAGE_BUTTON_HOW_LABEL')}
          </Button>
        );

        if (service.data?.attributes?.is_functional) {
          tags.push({
            label: t('__FUNCTIONAL_LABEL'),
            icon: <FunctionalIcon />,
          });
        } else {
          tags.push({
            label: t('__EXPERIENTIAL_LABEL'),
            icon: <ExperientialIcon />,
          });
        }

        if (service.data?.attributes?.is_express) {
          tags.push({
            label: t('__EXPRESS_LABEL'),
            icon: <ExpressIcon />,
          });

          buttons.push(
            <WaterButton
              isPill
              isStretched
              size="small"
              isPrimary
              onClick={() => {
                dispatch(openDrawer());
                toggleChat(false);
              }}
            >
              {t('__CATALOG_PAGE_BUTTON_EXPRESS_LABEL')}
            </WaterButton>
          );
        } else {
          tags.push({
            label: t('__TAILORED_LABEL'),
            icon: <TailoredIcon />,
          });

          buttons.push(
            <WaterButton
              isPill
              isStretched
              size="small"
              isPrimary
              onClick={() => {
                window.location.href = `mailto:${
                  activeWorkspace?.csm.email || 'info@unguess.io'
                }`;
              }}
            >
              {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
            </WaterButton>
          );
        }

        return service.data.attributes.is_info ? (
          <ServiceCol xs={12} md={6} lg={4}>
            <InfoCard
              infoImg={service.data.attributes.info_img}
              infoTitle={service.data.attributes.info_title}
              infoSubtitle={service.data.attributes.info_subtitle}
              infoButtons={service.data.attributes.info_buttons}
            />
          </ServiceCol>
        ) : (
          <ServiceCol xs={12} md={6} lg={4}>
            <ServiceCard
              serviceIcon={
                <img
                  src={iconUrl}
                  alt={`service ${service.data?.attributes?.title} icon`}
                />
              }
              serviceTitle={service.data?.attributes?.title}
              serviceSubtitle={service.data?.attributes?.campaign_type}
              tags={tags}
              isHoverable
              hoverTitle={service.data?.attributes?.campaign_type}
              hoverSubtitle={service.data?.attributes?.description}
              hoverButtons={buttons}
            />
          </ServiceCol>
        );
      })}
    </>
  );
};

export const Services = ({ services }: { services: any }) => {
  const dispatch = useAppDispatch();

  return (
    <ServicesContainer>
      <Row>
        <CardGroup items={services} />
      </Row>
      <ExpressDrawer
        onCtaClick={() => {
          dispatch(openWizard());
        }}
      />
      <ExpressWizardContainer />
    </ServicesContainer>
  );
};
