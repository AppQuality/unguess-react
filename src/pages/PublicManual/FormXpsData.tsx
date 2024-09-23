import { useEffect, useState } from 'react';
import { usePostCampaignsByCidUserMutation } from 'src/features/api';
import { usePublicManualContext } from './PublicManualContext';

export const FormXpsData = ({
  data,
}: {
  data: { name?: string; type?: string }[];
}) => {
  const { password, setToken, setUserData, userData, getCpId } =
    usePublicManualContext();
  const [createUser] = usePostCampaignsByCidUserMutation();
  const [form, setForm] = useState<Record<string, string>>({});

  useEffect(() => {
    if (userData && userData.length) {
      createUser({
        cid: getCpId(),
        body: { password, data: userData },
      })
        .unwrap()
        .then((res) => {
          setToken(res?.token || '');
        });
    }
  }, [userData]);

  return (
    <div>
      {JSON.stringify(form)}
      {data &&
        data.length &&
        data.map((item) => (
          <div style={{ margin: 10 }}>
            {item.name}:{' '}
            <input
              onChange={(e) => {
                setForm((old) => {
                  if (!item.name) return old;
                  return {
                    ...old,
                    [item.name]: e.target.value,
                  };
                });
              }}
              type={item.name}
            />
          </div>
        ))}
      <br />
      <button
        type="submit"
        onClick={() => {
          createUser({
            cid: getCpId(),
            body: {
              password,
              data: Object.entries(form).map(([name, value]) => ({
                name,
                value,
              })),
            },
          })
            .unwrap()
            .then((res) => {
              setToken(res?.token || '');
              setUserData(
                Object.entries(form).map(([name, value]) => ({ name, value }))
              );
            });
          console.log('submit');
        }}
      >
        Submit
      </button>
    </div>
  );
};
