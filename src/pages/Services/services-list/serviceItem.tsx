import {
  Button,
  CampaignCard,
  ServiceCard,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import i18n from 'src/i18n';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { extractStrapiData } from 'src/common/getStrapiData';
import { hasEnoughCoins, toggleChat } from 'src/common/utils';
import { STRAPI_URL } from 'src/constants';
import { useGetFullServicesByIdQuery } from 'src/features/backoffice/strapi';
import { ReactComponent as TailoredIcon } from 'src/assets/icons/tailored-icon.svg';
import { ReactComponent as ExpressIcon } from 'src/assets/icons/express-icon.svg';
import { ReactComponent as ExperientialIcon } from 'src/assets/icons/experiential-icon.svg';
import { ReactComponent as FunctionalIcon } from 'src/assets/icons/functional-icon.svg';
import {
  openDrawer,
  setExpressTypeId,
} from 'src/features/express/expressSlice';
import { ServiceCol } from './ServiceCol';

export const ServiceItem = ({
  serviceId,
  handleHubspot,
}: {
  serviceId: string;
  handleHubspot: () => void;
}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeWorkspace } = useAppSelector((state) => state.navigation);
  const { data, isFetching, isLoading, isError } = useGetFullServicesByIdQuery({
    id: serviceId,
    populate: {
      icon: '*',
      express: {
        populate: {
          express_type: '*',
        },
      },
    },
  });

  if (isLoading || isFetching || !data) {
    return (
      <ServiceCol xs={12} md={6} lg={4}>
        <CampaignCard isLoading projectTitle="" campaignTitle="" date="" />
      </ServiceCol>
    );
  }

  const service = extractStrapiData(data);

  const navigateToService = (id: number) => {
    const localizedRoute =
      i18n.language === 'en'
        ? `/services/${id}`
        : `/${i18n.language}/services/${id}`;

    navigate(localizedRoute);
  };

  if (isError) return null;

  const icon = extractStrapiData(service.icon);
  const express = extractStrapiData(service.express);
  const iconUrl = `${STRAPI_URL}${icon.url}`;
  const tags = [];
  const buttons = [];

  buttons.push(
    <Button
      className="service-card-details-button"
      isStretched
      size="small"
      onClick={() => navigateToService(service.id)}
    >
      {t('__CATALOG_PAGE_BUTTON_HOW_LABEL')}
    </Button>
  );

  if (service.is_functional) {
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

  if (express) {
    if (hasEnoughCoins({ workspace: activeWorkspace, coins: express.cost })) {
      tags.push({
        label: t('__EXPRESS_LABEL'),
        icon: <ExpressIcon />,
      });

      const expressType = extractStrapiData(express.express_type);
      if (!expressType) return null;

      if (!activeWorkspace?.isShared) {
        buttons.push(
          <Button
            className="service-card-express-button"
            isStretched
            size="small"
            isPrimary
            isAccent
            onClick={() => {
              dispatch(setExpressTypeId(expressType.id));
              dispatch(openDrawer());
              toggleChat(false);
            }}
          >
            {t('__CATALOG_PAGE_BUTTON_EXPRESS_LABEL')}
          </Button>
        );
      }
    } else {
      return null;
    }
  } else {
    tags.push({
      label: t('__TAILORED_LABEL'),
      icon: <TailoredIcon />,
    });

    buttons.push(
      <Button
        className="service-card-contact-button"
        isStretched
        isAccent
        size="small"
        isPrimary
        onClick={() => handleHubspot()}
      >
        {t('__CATALOG_PAGE_BUTTON_CONTACT_LABEL')}
      </Button>
    );
  }

  return (
    <ServiceCol xs={12} md={6} lg={4}>
      <ServiceCard
        {...(express
          ? { className: 'service-card-express' }
          : { className: 'service-card' })}
        serviceIcon={
          <img src={iconUrl} alt={`service ${service.title} icon`} />
        }
        serviceTitle={service.title}
        serviceSubtitle={service.campaign_type}
        tags={tags}
        isHoverable
        hoverTitle={service.campaign_type}
        hoverSubtitle={service.description}
        hoverButtons={buttons}
      />
    </ServiceCol>
  );
};
