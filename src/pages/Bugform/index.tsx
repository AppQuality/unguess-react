import IframeResizer from 'iframe-resizer-react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Header } from 'src/common/components/navigation/header/header';

const BugForm = () => {
  const { campaignId } = useParams<{ campaignId: string }>();
  const [query] = useSearchParams();
  const token = query.get('token') || '';
  return (
    <div>
      <Header logo="full" loggedIn={false} />
      <IframeResizer
        heightCalculationMethod="lowestElement"
        src={`${process.env.REACT_APP_TRYBER_URL}/vdp/${campaignId}/${token}`}
        style={{ width: '1px', minWidth: '100%', height: 0 }}
      />
    </div>
  );
};

export default BugForm;
