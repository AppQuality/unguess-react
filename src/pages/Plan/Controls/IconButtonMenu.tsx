import {
  ButtonMenu,
  IconButton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { ReactComponent as DotsIcon } from '@zendeskgarden/svg-icons/src/16/overflow-vertical-stroke.svg';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ReactComponent as SaveTemplateIcon } from 'src/assets/icons/template.svg';
import { Divider } from 'src/common/components/divider';
import { usePlanContext } from '../context/planContext';
import { usePlan } from '../hooks/usePlan';

const OptionalTooltip = ({
  children,
  content,
  show,
}: {
  children: React.ReactElement;
  content: string;
  show: boolean;
}) => {
  if (!show) {
    return children;
  }
  return (
    <Tooltip placement="start" type="light" size="small" content={content}>
      {children}
    </Tooltip>
  );
};

const IconButtonMenu = () => {
  const { t } = useTranslation();

  const { setIsSaveTemplateModalOpen, setIsDeleteModalOpen } = usePlanContext();
  const { planId } = useParams();
  const { plan } = usePlan(planId);

  const handleMenuClick = (value?: string) => {
    if (value === 'delete') {
      setIsDeleteModalOpen(true);
    }
    if (value === 'save_template') {
      setIsSaveTemplateModalOpen(true);
    }
  };

  return (
    <ButtonMenu
      onSelect={(value) => {
        handleMenuClick(value ?? '');
      }}
      label={(props) => (
        <IconButton data-qa="extra-actions-menu" {...props}>
          <DotsIcon />
        </IconButton>
      )}
    >
      <ButtonMenu.Item
        data-qa="save-template-action-item"
        value="save_template"
        icon={<SaveTemplateIcon />}
      >
        {t('__PLAN_SAVE_TEMPLATE_CTA')}
      </ButtonMenu.Item>
      <Divider />
      <OptionalTooltip
        show={plan?.status !== 'draft'}
        content={t('__PLAN_DELETE_PLAN_TOOLTIP')}
      >
        <ButtonMenu.Item
          data-qa="delete-action-item"
          type="danger"
          value="delete"
          isDisabled={plan?.status !== 'draft'}
          icon={<TrashIcon />}
        >
          {t('__PLAN_DELETE_PLAN_CTA')}
        </ButtonMenu.Item>
      </OptionalTooltip>
    </ButtonMenu>
  );
};

export { IconButtonMenu };
