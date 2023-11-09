import {
  Label,
  MediaInput,
  Paragraph,
  Button,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { useGetCampaignsByCidCustomStatusesQuery } from 'src/features/api';
import styled from 'styled-components';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-icon.svg';
import { Field } from '@zendeskgarden/react-forms';
import {
  setCustomStatusDrawerTouched,
  updateCustomStatus,
} from 'src/features/bugsPage/bugsPageSlice';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { useEffect, useState } from 'react';
import { Divider } from 'src/common/components/divider';
import { getCustomStatusPhaseName } from './getCustomStatusPhaseName';
import { DotsMenu } from './DotsMenu';
import { Circle } from './Circle';

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
  const [maxId, setMaxId] = useState(0);

  useEffect(() => {
    if (!customStatus) return;

    // Set as maxId the highest id in customStatus
    setMaxId(
      customStatus.reduce((acc, cs) => {
        if (cs.id > acc) return cs.id;
        return acc;
      }, 0)
    );
  }, [customStatus]);

  // Split custom statuses by phase into an object with multiple arrays
  const customStatusesByPhase = customStatuses?.reduce((acc, cs) => {
    if (!cs.is_default) return acc;
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

  useEffect(() => {
    // Update custom status with the new custom statuses with is_default === 0
    dispatch(
      updateCustomStatus(customStatuses?.filter((cs) => !cs.is_default) || [])
    );
  }, []);

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
                      end={<DotsMenu customStatusId={cs.id} />}
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

                        dispatch(setCustomStatusDrawerTouched(true));
                      }}
                      style={{ textTransform: 'capitalize' }}
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
                    start={<Circle color={`${cs.color}`} />}
                    end={<DotsMenu customStatusId={cs.id} />}
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

                      dispatch(setCustomStatusDrawerTouched(true));
                    }}
                  />
                </Field>
              ))}
            {phase.id === 1 && (
              <>
                <Button
                  isBasic
                  style={{ marginTop: appTheme.space.xs }}
                  onClick={() => {
                    dispatch(
                      updateCustomStatus([
                        ...customStatus,
                        {
                          id: maxId + 1, // Set highest id in customStatus + 1
                          name: '',
                          color: appTheme.palette.grey[400],
                          is_default: 0,
                          phase: {
                            id: phase.id,
                            name: phase.name,
                          },
                          is_new: true,
                        },
                      ])
                    );

                    dispatch(setCustomStatusDrawerTouched(true));
                  }}
                >
                  <AddIcon style={{ marginRight: appTheme.space.xs }} />
                  {t(
                    '__BUGS_PAGE_CUSTOM_STATUS_DRAWER_CREATE_CUSTOM_STATUS_BUTTON'
                  )}
                </Button>
                <Divider style={{ margin: `${appTheme.space.md} 0` }} />
              </>
            )}
          </>
        ))}
    </div>
  );
};
