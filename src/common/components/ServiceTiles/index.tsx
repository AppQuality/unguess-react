import {
  Col,
  Paragraph,
  Row,
  Separator,
  ServiceTile,
  SM,
  Tag,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useCampaignTemplates } from 'src/hooks/useCampaignTemplates';
import styled, { useTheme } from 'styled-components';

const AdditionalInfoTag = styled(Tag)`
  img {
    width: 12px;
    margin-right: ${({ theme }) => theme.space.xs};
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.sm};
`;
const CardWrapper = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.md};
`;

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const ServiceTiles = () => {
  const { data } = useCampaignTemplates();
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Row>
        <Col xs={12} style={{ marginBottom: theme.space.xxs }}>
          <Paragraph style={{ marginBottom: theme.space.xs }}>
            <StyledSM>{t('__SERVICE_TILES_HEADER')}</StyledSM>
          </Paragraph>
          <Separator />
        </Col>
      </Row>
      <CardWrapper>
        {data.map((template) => {
          const icon = <img alt={template.title || ''} src={template.icon} />;
          const superscript = template?.Price?.previous_price;
          const outputs = (template.output || []).map((output) => {
            const { text, iconUrl } = output;
            return (
              <AdditionalInfoTag
                key={text}
                color="#49545c"
                hue="#ffff"
                isPill
                size="medium"
              >
                <img src={iconUrl} alt="icon" />
                {text}
              </AdditionalInfoTag>
            );
          });

          return (
            <div style={{ flex: 1 }}>
              <ServiceTile
                title={template.title || ''}
                description={template?.description || ''}
                background={template?.background || theme.palette.blue[700]}
                price={template?.Price?.price || '-'}
                icon={icon}
                superscript={superscript?.length ? superscript : undefined}
                isSuperscriptStrikethrough={template?.Price?.is_strikethrough}
                additionalInfo={
                  <div style={{ display: 'flex', gap: '4px' }}>{outputs}</div>
                }
              />
            </div>
          );
        })}
      </CardWrapper>
    </Wrapper>
  );
};

export { ServiceTiles };
