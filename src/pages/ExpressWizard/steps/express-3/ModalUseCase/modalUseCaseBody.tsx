import {
  Button,
  ContainerCard,
  LG,
  Paragraph,
  retrieveComponentStyles,
} from '@appquality/unguess-design-system';
import { FieldArray, useFormikContext } from 'formik';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { ReactComponent as EmptyImg } from 'src/assets/modal-use-case-empty.svg';
import { UseCase } from 'src/pages/ExpressWizard/fields/how';
import { WizardModel } from 'src/pages/ExpressWizard/wizardModel';
import styled from 'styled-components';
import { ScrollingContainer } from './modalUseCaseHelp';
import { UseCaseDetails } from './useCaseDetails';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const PullLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.space.md};
`;

const BodyScrollingContainer = styled(ScrollingContainer)`
  padding-left: calc(
    ${({ theme }) => theme.space.xxl} + ${({ theme }) => theme.space.xxl}
  );
  padding-right: ${({ theme }) => theme.space.lg};

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  &:hover {
    ::-webkit-scrollbar {
      background-color: inherit;
    }
  }

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0 ${({ theme }) => theme.space.sm};
  }
`;

const EmptyStateTitle = styled(LG)`
  ${(props) => retrieveComponentStyles('text.primary', props)};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
`;

const EmptyStateText = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
  text-align: center;
`;

const StyledContainerCard = styled(ContainerCard)`
  padding: ${({ theme }) => theme.space.xl};

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.space.lg} ${theme.space.md}`};
  }
`;

export const ModalUseCaseBody = ({
  currentUseCase,
  setUseCase,
}: {
  currentUseCase?: UseCase;
  setUseCase: (item?: UseCase) => void;
}) => {
  const { t } = useTranslation();
  const { values } = useFormikContext<WizardModel>();
  const { use_cases } = values;

  const useCaseIndex =
    currentUseCase && use_cases && Array.isArray(use_cases) && use_cases.length
      ? use_cases.findIndex((item) => item.id === currentUseCase.id)
      : 0;

  return (
    <BodyScrollingContainer>
      <StyledContainerCard>
        {use_cases && currentUseCase && use_cases.length ? (
          <>
            <UseCaseDetails
              key={`useCaseDetails_k${currentUseCase.id}`}
              useCase={currentUseCase}
              useCaseIndex={useCaseIndex}
            />
            <PullLeft style={{ marginTop: appTheme.space.xxl }}>
              <FieldArray name="use_cases">
                {({ remove }) => (
                  <Button
                    isDanger
                    isBasic
                    onClick={() => {
                      remove(useCaseIndex);

                      if (useCaseIndex === 0) {
                        // If there is at least an other use case next, set it
                        if (use_cases[useCaseIndex + 1]) {
                          setUseCase(use_cases[useCaseIndex + 1]);
                        } else {
                          // Clear current use case
                          setUseCase();
                        }
                      } else if (useCaseIndex > 0) {
                        // Set the previous one
                        setUseCase(use_cases[useCaseIndex - 1]);
                      }
                    }}
                  >
                    <Button.StartIcon>
                      <TrashIcon />
                    </Button.StartIcon>
                    {t(
                      '__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_DELETE_USE_CASE_LABEL'
                    )}
                  </Button>
                )}
              </FieldArray>
            </PullLeft>
          </>
        ) : (
          <CenteredContainer>
            <EmptyImg style={{ marginBottom: appTheme.space.lg }} />
            <EmptyStateTitle>
              {t(
                '__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_EMPTY_USE_CASE_LABEL'
              )}
            </EmptyStateTitle>
            <EmptyStateText>
              {t(
                '__EXPRESS_3_WIZARD_STEP_HOW_USE_CASE_MODAL_EMPTY_USE_CASE_DESCRIPTION'
              )}
            </EmptyStateText>
          </CenteredContainer>
        )}
      </StyledContainerCard>
    </BodyScrollingContainer>
  );
};
