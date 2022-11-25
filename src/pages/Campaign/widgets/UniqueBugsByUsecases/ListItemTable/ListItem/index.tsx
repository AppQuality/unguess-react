import {
  Span,
  theme as globalTheme,
  Title,
} from '@appquality/unguess-design-system';

export const ListItem = ({
  item,
}: {
  item: { usecase: string; unique: number; total: number };
}) => (
  <>
    <Span style={{ textAlign: 'center', height: '20px' }}>
      <Title style={{ float: 'left' }}>{item.usecase}</Title>
      <Span style={{ float: 'right' }}>
        <Span style={{ color: globalTheme.palette.blue[600] }}>
          {item.unique}
        </Span>
        /{item.total}
      </Span>
    </Span>
    <div
      style={{
        height: '2px',
        width: '100%',
        marginBottom: '16px',
        display: 'flex',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${Math.round((item.unique / item.total) * 100)}%`,
          background: '#02807A',
        }}
      >
        {' '}
      </div>
      <div
        style={{
          height: '100%',
          width: `${Math.round(100 - (item.unique / item.total) * 100)}%`,
          background: globalTheme.palette.grey[200],
        }}
      >
        {' '}
      </div>
    </div>
  </>
);
