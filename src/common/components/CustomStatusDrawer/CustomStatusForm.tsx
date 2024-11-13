import {
  Button,
  FormField as Field,
  Label,
  MediaInput,
  Paragraph,
} from '@appquality/unguess-design-system';
import { FieldArray, Form, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { appTheme } from 'src/app/theme';
import { ReactComponent as AddIcon } from 'src/assets/icons/plus-icon.svg';
import { Divider } from 'src/common/components/divider';
import { useGetCampaignsByCidCustomStatusesQuery } from 'src/features/api';
import styled from 'styled-components';
import { Circle } from './Circle';
import { DotsMenu } from './DotsMenu';
import { StatusValidationMessage } from './StatusValidationMessage';
import { CustomStatusFormProps } from './formModel';
import { getCustomStatusPhaseName } from './getCustomStatusPhaseName';

const FakeInput = styled.div`
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.sm};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-transform: capitalize;
`;

const StyledCircle = styled(Circle)`
  margin-right: ${({ theme }) => theme.space.xs};
`;

export const CustomStatusForm = ({
  formikProps,
}: {
  formikProps: FormikProps<CustomStatusFormProps>;
}) => {
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

  /**
   * Split custom statuses by phase into an object with multiple arrays
   */
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
    <Form
      onSubmit={formikProps.handleSubmit}
      style={{ marginBottom: appTheme.space.sm }}
    >
      <FieldArray name="custom_statuses">
        {(helpers) => (
          <div>
            {/**
             * For each custom status, I'll print the default ones and then all editable ones
             */}
            {customStatusesByPhase &&
              customStatusesByPhase.map((phase) => (
                <>
                  <Label
                    style={{
                      display: 'block',
                      marginBottom: appTheme.space.sm,
                    }}
                  >
                    {getCustomStatusPhaseName(phase, t)}
                  </Label>
                  {phase.customStatuses.map((cs) => (
                    <div style={{ marginBottom: appTheme.space.xs }}>
                      {!!cs.is_default && (
                        <FakeInput>
                          <StyledCircle color={`#${cs.color}`} />
                          <Paragraph>{cs.name}</Paragraph>
                        </FakeInput>
                      )}
                    </div>
                  ))}

                  {formikProps.values &&
                    formikProps.values.custom_statuses.map((status, index) => {
                      if (status.phase.id === phase.id) {
                        return (
                          <Field
                            key={`phase-${phase.id}-custom-status-${status.id}`}
                            style={{
                              marginBottom: appTheme.space.xs,
                            }}
                          >
                            <MediaInput
                              key={`custom-status-${status.id}`}
                              id={`custom-status-${phase.id}`}
                              start={<Circle color={`#${status.color}`} />}
                              end={
                                <DotsMenu
                                  arrayHelpers={helpers}
                                  formikProps={formikProps}
                                  field_id={index}
                                />
                              }
                              {...formikProps.getFieldProps(
                                `custom_statuses.${index}.name`
                              )}
                              style={{ textTransform: 'capitalize' }}
                            />
                            <StatusValidationMessage
                              formikProps={formikProps}
                              field_id={index}
                            />
                          </Field>
                        );
                      }

                      return null;
                    })}

                  {phase.id === 1 && (
                    <>
                      <Button
                        isBasic
                        style={{ marginTop: appTheme.space.xs }}
                        onClick={() => {
                          helpers.push({
                            name: '',
                            color: appTheme.palette.grey[400].replace('#', ''),
                            phase: { id: phase.id, name: phase.name },
                            is_default: 0,
                          });
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
        )}
      </FieldArray>
    </Form>
  );
};
