import {
  Label,
  MediaInput,
  Paragraph,
  Button,
} from '@appquality/unguess-design-system';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidCustomStatusesQuery } from 'src/features/api';
import styled from 'styled-components';
import * as Yup from 'yup';
import { ReactComponent as CircleFill } from 'src/assets/icons/circle-full-fill.svg';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-icon.svg';
import { Field } from '@zendeskgarden/react-forms';
import { getCustomStatusPhaseName } from './getCustomStatusPhaseName';
import { DotsMenu } from './DotsMenu';

export const Circle = styled(CircleFill)<{
  color: string;
}>`
  width: auto;
  height: 100%;
  max-height: 10px;
  margin: 0 2px;
  border-radius: 50%;
  color: ${({ color }) => color};
  margin-right: ${({ theme }) => theme.space.xs};
`;

const FakeInput = styled.div`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-transform: capitalize;
`;

export const CustomStatusForm = () => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const {
    data: customStatuses,
    isLoading,
    isFetching,
    isError,
  } = useGetCampaignsByCidCustomStatusesQuery({
    cid: campaignId?.toString() || '',
  });

  // Split custom statuses by phase into an object with multiple arrays
  const customStatusesByPhase = customStatuses?.reduce((acc, customStatus) => {
    const phase = acc.find((p) => p.id === customStatus.phase.id);
    if (phase) {
      phase.customStatuses.push(customStatus);
    } else {
      acc.push({
        id: customStatus.phase.id,
        name: customStatus.phase.name,
        customStatuses: [customStatus],
      });
    }
    return acc;
  }, [] as { id: number; name: string; customStatuses: typeof customStatuses }[]);

  if (isError) return null;

  return (
    <div>
      {customStatusesByPhase &&
        customStatusesByPhase.map((phase) => (
          <>
            <Label
              style={{ display: 'block', marginBottom: appTheme.space.sm }}
            >
              {getCustomStatusPhaseName(phase, t)}
            </Label>
            {phase.customStatuses.map((customStatus) => (
              <div style={{ marginBottom: appTheme.space.xs }}>
                {customStatus.is_default ? (
                  <FakeInput>
                    <Circle
                      color={`#${customStatus.color}`}
                      {...(customStatus.id === 1 && {
                        style: {
                          border: `2px solid ${appTheme.palette.grey[400]}`,
                        },
                      })}
                    />
                    <Paragraph>{customStatus.name}</Paragraph>
                  </FakeInput>
                ) : (
                  <Field
                    key={phase.id}
                    style={{ marginBottom: appTheme.space.md }}
                  >
                    <MediaInput
                      key={`custom-status-${customStatus.id}`}
                      name="customStatus"
                      value={customStatus.name}
                      id={`custom-status-${customStatus.id}`}
                      start={
                        <Circle
                          color={`#${customStatus.color}`}
                          {...(customStatus.id === 1 && {
                            style: {
                              border: `2px solid ${appTheme.palette.grey[400]}`,
                            },
                          })}
                        />
                      }
                      end={<DotsMenu />}
                    />
                  </Field>
                )}
              </div>
            ))}
            {phase.id === 1 && (
              <Button isBasic style={{ marginBottom: appTheme.space.md }}>
                <AddIcon style={{ marginRight: appTheme.space.xs }} />
                {t(
                  '__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CREATE_CUSTOM_STATUS_BUTTON'
                )}
              </Button>
            )}
          </>
        ))}
    </div>
  );
};
