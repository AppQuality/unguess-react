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
import { updateCustomStatus } from 'src/features/bugsPage/bugsPageSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
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
  const dispatch = useAppDispatch();
  const { customStatus } = useAppSelector((state) => state.bugsPage);

  // Split custom statuses by phase into an object with multiple arrays
  const customStatusesByPhase = customStatuses?.reduce((acc, cs) => {
    const phase = acc.find((p) => p.id === cs.phase.id);
    if (phase) {
      phase.customStatuses.push(cs);
    } else {
      acc.push({
        id: cs.phase.id,
        name: cs.phase.name,
        customStatuses: [cs],
      });
    }
    return acc;
  }, [] as { id: number; name: string; customStatuses: typeof customStatuses }[]);

  if (isLoading || isFetching || isError) return null;

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
            {phase.customStatuses.map((cs) => (
              <div style={{ marginBottom: appTheme.space.xs }}>
                {cs.is_default ? (
                  <FakeInput>
                    <Circle
                      color={`#${cs.color}`}
                      {...(cs.id === 1 && {
                        style: {
                          border: `2px solid ${appTheme.palette.grey[400]}`,
                        },
                      })}
                    />
                    <Paragraph>{cs.name}</Paragraph>
                  </FakeInput>
                ) : (
                  <Field
                    key={`phase-${phase.id}-custom-status-${cs.id}`}
                    style={{ marginBottom: appTheme.space.xs }}
                  >
                    <MediaInput
                      key={`custom-status-${cs.id}`}
                      name="customStatus"
                      value={cs.name}
                      id={`custom-status-${cs.id}`}
                      start={
                        <Circle
                          color={`#${cs.color}`}
                          {...(cs.id === 1 && {
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
            {phase.id === 1 &&
              customStatus &&
              customStatus.map((cs) => (
                <Field
                  key={`phase-${phase.id}-custom-status-${cs.id}`}
                  style={{ marginBottom: appTheme.space.xs }}
                >
                  <MediaInput
                    key={`custom-status-${cs.id}`}
                    name="customStatus"
                    value={cs.name}
                    id={`custom-status-${cs.id}`}
                    start={<Circle color={`#${cs.color}`} />}
                    end={<DotsMenu />}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      const { value } = target;

                      dispatch(
                        updateCustomStatus(
                          customStatus.map((c) => {
                            if (c.id === cs.id) {
                              return {
                                ...c,
                                name: value,
                              };
                            }
                            return c;
                          })
                        )
                      );
                    }}
                  />
                </Field>
              ))}
            {phase.id === 1 && (
              <Button
                isBasic
                style={{ marginBottom: appTheme.space.md }}
                onClick={() => {
                  dispatch(
                    updateCustomStatus([
                      ...customStatus,
                      {
                        id: customStatus.length + 1,
                        name: '',
                        color: appTheme.palette.grey[400],
                        is_default: 0,
                        phase: {
                          id: phase.id,
                          name: phase.name,
                        },
                      },
                    ])
                  );
                }}
              >
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
