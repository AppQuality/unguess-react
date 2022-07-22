import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { closeUseCaseModal } from 'src/features/express/expressSlice';
import {
  Col,
  Grid,
  ModalFullScreen,
  Row,
  ContainerCard,
  Label,
  theme as globalTheme,
  Span,
  Input,
  Dropdown,
  Select,
  Menu,
  Item,
  Message,
  MediaInput,
  Paragraph,
  Textarea,
} from '@appquality/unguess-design-system';
import { Field as DropdownField } from '@zendeskgarden/react-dropdowns';
import { ReactComponent as FunctionalityIcon } from 'src/assets/icons/functionality-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { ModalUseCaseHeader } from './modalUseCaseHeader';
import { ModalUseCaseHelp } from './modalUseCaseHelp';
import { ModalUseCaseTabLayout } from './modalUseCaseTabLayout';
import { Notes, NotesTitle } from './notesCard';

const Body = styled(ModalFullScreen.Body)`
  padding: 0;
`;

const ContentCol = styled(Col)`
  padding: ${({ theme }) => theme.space.xl};
  margin-bottom: 0;
`;

const HelpCol = styled(Col)`
  padding: ${({ theme }) => theme.space.xl};
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  background-color: white;
  margin-bottom: 0;
`;

const TextCasesTabs = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 0 ${({ theme }) => theme.space.md};
`;

const TextCaseForm = styled(ContainerCard)`
  margin-top: ${({ theme }) => theme.space.lg};
`;

const StyledFormField = styled.div`
  margin-top: ${({ theme }) => theme.space.md};
`;

const StyledMessage = styled(Message)`
  margin-top: ${({ theme }) => theme.space.sm};
`;

export const ModalUseCase = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { isUseCaseModalOpen } = useAppSelector((state) => state.express);

  return isUseCaseModalOpen ? (
    <ModalFullScreen
      onClose={() => {
        dispatch(closeUseCaseModal());
      }}
    >
      <ModalFullScreen.Header>
        <ModalUseCaseHeader />
      </ModalFullScreen.Header>
      <Body>
        <Grid>
          <Row>
            <ContentCol xs={8}>
              <TextCasesTabs>
                <ModalUseCaseTabLayout />
              </TextCasesTabs>
              <TextCaseForm>
                <StyledFormField style={{ marginTop: 0 }}>
                  <Label>
                    {t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_TITLE'
                    )}
                    <Span style={{ color: globalTheme.colors.dangerHue }}>
                      *
                    </Span>
                  </Label>
                  <Input
                    type="text"
                    placeholder={t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_TITLE_FIELD_PLACEHOLDER'
                    )}
                    focusInset
                  />
                </StyledFormField>
                <StyledFormField>
                  <Dropdown>
                    <DropdownField>
                      <Label>
                        {t(
                          '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_TITLE'
                        )}
                      </Label>
                      <Select start={<FunctionalityIcon />}>
                        {t(
                          '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_PRODUCT_FIELD_PLACEHOLDER'
                        )}
                      </Select>
                    </DropdownField>
                    <Menu>
                      <Item key="" value="">
                        adsadsadsa
                      </Item>
                    </Menu>
                  </Dropdown>
                </StyledFormField>
                <Notes style={{ marginTop: globalTheme.space.lg }}>
                  <NotesTitle>
                    {t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_NOTES_FIELD_TITLE'
                    )}
                  </NotesTitle>
                  <Paragraph>
                    {t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_NOTES_FIELD_SUBTITLE'
                    )}
                  </Paragraph>
                </Notes>
                <StyledFormField>
                  <Textarea
                    rows={12}
                    style={{ marginTop: globalTheme.space.md }}
                  />
                </StyledFormField>
                <StyledFormField>
                  <Label>
                    {t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_TITLE'
                    )}
                    <Span style={{ color: globalTheme.palette.grey[600] }}>
                      {t('__FORM_OPTIONAL_LABEL')}
                    </Span>
                  </Label>
                  <Paragraph style={{ marginBottom: globalTheme.space.xs }}>
                    {t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_SUBTITLE'
                    )}
                  </Paragraph>
                  <MediaInput
                    start={<LinkIcon />}
                    type="text"
                    placeholder={t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_PLACEHOLDER'
                    )}
                    focusInset
                  />
                  <StyledMessage>
                    {t(
                      '__EXPRESS_WIZARD_STEP_HOW_USE_CASE_MODAL_LINK_FIELD_MESSAGE'
                    )}
                  </StyledMessage>
                </StyledFormField>
              </TextCaseForm>
            </ContentCol>
            <HelpCol xs={4}>
              <ModalUseCaseHelp />
            </HelpCol>
          </Row>
        </Grid>
      </Body>
    </ModalFullScreen>
  ) : null;
};
