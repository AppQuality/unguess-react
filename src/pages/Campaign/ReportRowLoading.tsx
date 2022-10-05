import {
  Col,
  Row,
  Skeleton,
  SpecialCard,
  theme,
} from '@appquality/unguess-design-system';

export const ReportRowLoading = () => (
  <Row>
    <Col xs={12} md={6} lg={3}>
      <SpecialCard>
        <SpecialCard.Meta
          justifyContent="start"
          style={{ fontSize: theme.fontSizes.sm }}
        >
          <Skeleton width="50%" height="12px" />
        </SpecialCard.Meta>

        <SpecialCard.Thumb>
          <Skeleton width="60px" height="60px" />
        </SpecialCard.Thumb>

        <SpecialCard.Header>
          <SpecialCard.Header.Title style={{ width: '100%' }}>
            <Skeleton width="75%" height="20px" />
          </SpecialCard.Header.Title>
        </SpecialCard.Header>

        <SpecialCard.Footer direction="column" justifyContent="center">
          <Skeleton width="100%" height="30px" />
        </SpecialCard.Footer>
      </SpecialCard>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <SpecialCard>
        <SpecialCard.Meta
          justifyContent="start"
          style={{ fontSize: theme.fontSizes.sm }}
        >
          <Skeleton width="50%" height="12px" />
        </SpecialCard.Meta>

        <SpecialCard.Thumb>
          <Skeleton width="60px" height="60px" />
        </SpecialCard.Thumb>

        <SpecialCard.Header>
          <SpecialCard.Header.Title style={{ width: '100%' }}>
            <Skeleton width="75%" height="20px" />
          </SpecialCard.Header.Title>
        </SpecialCard.Header>

        <SpecialCard.Footer direction="column" justifyContent="center">
          <Skeleton width="100%" height="30px" />
        </SpecialCard.Footer>
      </SpecialCard>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <SpecialCard>
        <SpecialCard.Meta
          justifyContent="start"
          style={{ fontSize: theme.fontSizes.sm }}
        >
          <Skeleton width="50%" height="12px" />
        </SpecialCard.Meta>

        <SpecialCard.Thumb>
          <Skeleton width="60px" height="60px" />
        </SpecialCard.Thumb>

        <SpecialCard.Header>
          <SpecialCard.Header.Title style={{ width: '100%' }}>
            <Skeleton width="75%" height="20px" />
          </SpecialCard.Header.Title>
        </SpecialCard.Header>

        <SpecialCard.Footer direction="column" justifyContent="center">
          <Skeleton width="100%" height="30px" />
        </SpecialCard.Footer>
      </SpecialCard>
    </Col>
    <Col xs={12} md={6} lg={3}>
      <SpecialCard>
        <SpecialCard.Meta
          justifyContent="start"
          style={{ fontSize: theme.fontSizes.sm }}
        >
          <Skeleton width="50%" height="12px" />
        </SpecialCard.Meta>

        <SpecialCard.Thumb>
          <Skeleton width="60px" height="60px" />
        </SpecialCard.Thumb>

        <SpecialCard.Header>
          <SpecialCard.Header.Title style={{ width: '100%' }}>
            <Skeleton width="75%" height="20px" />
          </SpecialCard.Header.Title>
        </SpecialCard.Header>

        <SpecialCard.Footer direction="column" justifyContent="center">
          <Skeleton width="100%" height="30px" />
        </SpecialCard.Footer>
      </SpecialCard>
    </Col>
  </Row>
);
