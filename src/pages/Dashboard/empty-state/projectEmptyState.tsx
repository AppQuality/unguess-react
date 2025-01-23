import { Paragraph, Separator } from '@appquality/unguess-design-system';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { SectionTitle } from 'src/common/components/SectionTitle';
import { ServiceTiles } from 'src/common/components/ServiceTiles';
import styled from 'styled-components';
import { ReactComponent as UGLogoMedium } from './assets/unguess-medium.svg';
import { ReactComponent as UGLogoSmall } from './assets/unguess-small.svg';
import { ReactComponent as UGLogoBig } from './assets/unguess-big.svg';

const EmptyProjectContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background-color: #f9feff;
  position: relative;
`;

export const ProjectEmptyState = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [distanceFromTop, setDistanceFromTop] = useState(0);

  useEffect(() => {
    const calculateDistance = () => {
      if (containerRef.current) {
        // Distance from the top of the page
        const rect =
          containerRef && containerRef?.current.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        setDistanceFromTop(rect.top + scrollTop);
      }
    };

    calculateDistance();
    window.addEventListener('resize', calculateDistance);

    return () => {
      window.removeEventListener('resize', calculateDistance);
    };
  }, []);
  return (
    <EmptyProjectContainer
      ref={containerRef}
      style={{ height: `calc(100vh - ${distanceFromTop}px)` }}
    >
      <Paragraph style={{ textAlign: 'center', width: '100%' }}>
        <SectionTitle
          title={t('__SERVICE_TILES_HEADER_EMPTY_STATE')}
          subtitle={t('__SERVICE_TILES_SUBTITLE_EMPTY_STATE')}
        />
      </Paragraph>
      <Separator
        style={{
          margin: `${appTheme.space.md} 0 ${appTheme.space.lg}`,
          width: '50%',
        }}
      />
      <ServiceTiles />
      <UGLogoMedium
        style={{ top: 0, left: 0, position: 'absolute', opacity: 0.5 }}
      />
      <UGLogoSmall
        style={{ bottom: 0, left: '20%', position: 'absolute', opacity: 0.5 }}
      />
      <UGLogoBig
        style={{
          top: 0,
          right: 0,
          position: 'absolute',
          opacity: 0.5,
          zIndex: appTheme.levels.base,
        }}
      />
    </EmptyProjectContainer>
  );
};
