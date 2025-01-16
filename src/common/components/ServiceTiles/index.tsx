import {
  Col,
  Paragraph,
  Row,
  Separator,
  ServiceTile,
  Tag,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'src/app/hooks';
import {
  openDrawer,
  openWizard,
  setExpressTypeId,
} from 'src/features/express/expressSlice';
import { useCampaignTemplates } from 'src/hooks/useCampaignTemplates';
import { ExpressDrawer } from 'src/pages/ExpressWizard/drawer';
import styled, { useTheme } from 'styled-components';
import { SectionTitle } from '../SectionTitle';

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

const ServiceTiles = () => {
  const { data } = useCampaignTemplates();
  const theme = useTheme();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
      <ExpressDrawer
        onCtaClick={() => {
          dispatch(openWizard());
        }}
      />
      <Wrapper>
        <Row>
          <Col xs={12} style={{ marginBottom: 0 }}>
            <Paragraph>
              <SectionTitle
                title={t('__SERVICE_TILES_HEADER')}
                subtitle={t('__SERVICE_TILES_SUBTITLE')}
              />
              <Separator style={{ margin: `${theme.space.md} 0` }} />
            </Paragraph>
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
                  color={theme.palette.grey[700]}
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
                  onClick={() => {
                    dispatch(setExpressTypeId(template.expressId));
                    dispatch(openDrawer());
                  }}
                />
              </div>
            );
          })}
        </CardWrapper>
      </Wrapper>
    </>
  );
};

export { ServiceTiles };
