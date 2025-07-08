import {
  AccordionNew,
  Button,
  Card,
  Input,
  Label,
  LG,
  theme,
} from '@appquality/unguess-design-system';
import { useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as KeyIcon } from 'src/assets/icons/key.svg';
import { ReactComponent as UserIcon } from 'src/assets/icons/user.svg';
import { ProfileFormValues } from './valuesType';

export const Form = () => {
  const { t } = useTranslation();

  const { setFieldValue, validateForm, setTouched, status } =
    useFormikContext<ProfileFormValues>();
  const isOpen = false; // Temporary, as the context is not fully implemented yet
  return (
    <>
      <Card id="anchor-profile" style={{ marginBottom: theme.space.xxl }}>
        <LG style={{ color: theme.palette.blue[600] }}>
          <UserIcon /> {t('__PROFILE_PAGE_USER_CARD_LABEL')}
        </LG>
        <div>
          <Label>{t('__PROFILE_PAGE_USER_CARD_NAME_LABEL')}</Label>
          <Input
            type="text"
            placeholder={t('__PROFILE_PAGE_USER_NAME_INPUT_PLACEHOLDER')}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Label>{t('__PROFILE_PAGE_USER_CARD_SURNAME_LABEL')}</Label>
          <Input
            type="text"
            placeholder={t('__PROFILE_PAGE_USER_SURNAME_INPUT_PLACEHOLDER')}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <Label>{t('__PROFILE_PAGE_USER_CARD_EMAIL_LABEL')}</Label>
          <Input disabled type="text" style={{ width: '100%' }} />
        </div>
        <div>
          <Label>{t('__PROFILE_PAGE_USER_CARD_ROLE_LABEL')}</Label>
          {/* <Field name="roleId">
                        {({ field, meta }: FieldProps) => {
                          const hasError = meta.touched && Boolean(meta.error);
                          return (
                            <div ref={selectRef}>
                              <Select
                                data-qa="roleId-select"
                                {...field}
                                renderValue={(value) =>
                                  data?.find(
                                    (role) =>
                                      role.id === Number(value.inputValue)
                                  )?.name
                                }
                                isCompact
                                inputValue={field.value}
                                selectionValue={field.value}
                                label={
                                  <>
                                    {t('SIGNUP_FORM_ROLE_LABEL')}
                                    <Span
                                      style={{
                                        color: appTheme.palette.red[600],
                                      }}
                                    >
                                      *
                                    </Span>
                                  </>
                                }
                                onSelect={(roleId) => {
                                  setFieldValue('roleId', Number(roleId));
                                  (
                                    selectRef.current?.querySelector(
                                      '[role="combobox"]'
                                    ) as HTMLElement | null
                                  )?.blur();
                                }}
                              >
                                {renderOptions}
                              </Select>
                              {hasError && (
                                <Message
                                  data-qa="update-profile-role-error"
                                  validation="error"
                                >
                                  {meta.error}
                                </Message>
                              )}
                            </div>
                          );
                        }}
                      </Field> */}
        </div>
        <div>
          <Button
            isAccent
            isPrimary
            onClick={() => {
              alert('User profile update functionality not implemented yet.');
            }}
          >
            Save changes
          </Button>
        </div>
      </Card>
      <Card>
        <AccordionNew
          level={3}
          key={`password_accordion_${isOpen}`}
          defaultExpandedSections={isOpen ? [0, 1] : []}
        >
          <AccordionNew.Section>
            <AccordionNew.Header icon={<KeyIcon />}>
              <AccordionNew.Label
                style={{
                  color: appTheme.palette.blue[600],
                }}
                label={t('__PROFILE_PAGE_PASSWORD_ACCORDION_LABEL')}
              />
            </AccordionNew.Header>
            <AccordionNew.Panel>bla bla</AccordionNew.Panel>
          </AccordionNew.Section>
        </AccordionNew>
      </Card>
    </>
  );
};
