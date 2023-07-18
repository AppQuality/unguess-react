import { LayoutWrapper } from 'src/common/components/LayoutWrapper';
import styled from 'styled-components';
import { ReactComponent as BugIcon } from 'src/assets/icons/bugs-icon.svg';
import { BrandLogo } from 'src/common/components/navigation/header/brandLogo';
import { appTheme } from 'src/app/theme';
import { Button } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ManualHeaderWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
  padding: ${({ theme }) => theme.space.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
`;

interface ManualHeaderProps {
  manual?: {
    campaignId?: number;
    token?: string;
  };
}

const ManualHeader = ({ manual }: ManualHeaderProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <ManualHeaderWrapper>
      <LayoutWrapper>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <BrandLogo size="full" />
          {manual?.campaignId && manual?.token && (
            <Button
              onClick={() =>
                navigate(
                  `/campaigns/${manual.campaignId}/bugform/?token=${manual.token}`
                )
              }
              isPrimary
              isAccent
            >
              <Button.StartIcon>
                <BugIcon fill={appTheme.palette.white} />
              </Button.StartIcon>
              {t('__PUBLIC_MANUAL_CTA_GOTO_BUG_FORM')}
            </Button>
          )}
        </div>
      </LayoutWrapper>
    </ManualHeaderWrapper>
  );
};

export default ManualHeader;
