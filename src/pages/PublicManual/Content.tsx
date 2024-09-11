import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePostCampaignsByCidUserMutation } from 'src/features/api';

export const Content = ({
  data,
  campaignId,
}: {
  data: { title?: string; description?: string; data?: any };
  campaignId: string;
}) => {
  const [createUser] = usePostCampaignsByCidUserMutation();
  const [token, setToken] = useState('');

  useEffect(() => {
    createUser({ cid: campaignId, body: { password: 'Pippo' } })
      .unwrap()
      .then((res) => {
        setToken(res?.token || '');
      });
  }, []);

  return (
    <>
      <h1>Title: {data.title}</h1>
      <p>Description: {data.description}</p>
      <p>Token: {token}</p>
    </>
  );
};
