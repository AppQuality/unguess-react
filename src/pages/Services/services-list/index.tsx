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
import { useMemo, useState } from 'react';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/experiential-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import { WaterButton } from 'src/common/components/waterButton';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { openDrawer, openWizard } from 'src/features/express/expressSlice';
import { ExpressWizardContainer } from 'src/pages/ExpressWizard';
import { HubspotModal } from 'src/common/components/HubspotModal';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import { toggleChat } from 'src/common/utils';
import { STRAPI_URL } from 'src/constants';

const ServicesContainer = styled.div``;

const ServiceCol = styled(Col)`
  margin-bottom: ${theme.space.lg};
`;

const checkHubspotURL = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'meetings.hubspot.com';
  } catch (e) {
    return false;
  }
};

const CardGroup = ({ items }: { items: any }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeWorkspace } = useAppSelector((state) => state.navigation);

  const memoCsm = useMemo(() => activeWorkspace?.csm, [activeWorkspace]);

  const navigateToService = (serviceId: number) => {
    const localizedRoute =
      i18n.language === 'en'
        ? `/services/${serviceId}`
        : `/${i18n.language}/services/${serviceId}`;

    navigate(localizedRoute);
  };

  return (
    <>
      <HubspotModal
        isOpen={isModalOpen}
        meetingUrl={memoCsm?.url}
        onClose={() => setIsModalOpen(false)}
      />
      {items.map((service: any) => {
        const iconUrl = `${STRAPI_URL}${service?.attributes?.icon?.data?.attributes?.url}`;
        const tags = [];
        const buttons = [];

        buttons.push(
          <Button
            isPill
            isStretched
            size="small"
            onClick={() => navigateToService(service.id)}
          >
            {t('__CATALOG_PAGE_BUTTON_HOW_LABEL')}
          </Button>
        );

        if (service?.attributes?.is_functional) {
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

        if (service?.attributes?.is_express) {
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
                if (memoCsm && memoCsm.url && checkHubspotURL(memoCsm.url)) {
                  setIsModalOpen(true);
                } else {
                  window.location.href = `mailto:${
                    activeWorkspace?.csm.email || 'info@unguess.io'
                  }`;
                }
              }}
            >
              {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
            </WaterButton>
          );
        }

        return service.is_info ? (
          <ServiceCol xs={12} md={6} lg={4}>
            <InfoCard
              infoImg={service.info_img}
              infoTitle={service.info_title}
              infoSubtitle={service.info_subtitle}
              infoButtons={service.info_buttons}
            />
          </ServiceCol>
        ) : (
          <ServiceCol xs={12} md={6} lg={4}>
            <ServiceCard
              serviceIcon={
                <img
                  src={iconUrl}
                  alt={`service ${service?.attributes?.title} icon`}
                />
              }
              serviceTitle={service?.attributes?.title}
              serviceSubtitle={service?.attributes?.campaign_type}
              tags={tags}
              isHoverable
              hoverTitle={service?.attributes?.campaign_type}
              hoverSubtitle={service?.attributes?.description}
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
