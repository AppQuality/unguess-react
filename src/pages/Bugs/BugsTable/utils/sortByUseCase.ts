import { GetCampaignsByCidUsecasesApiResponse } from 'src/features/api';
import { TableBugType } from '../../types';
import { BugByUsecaseType } from '../types';

export const sortByUseCase = (
  bugs: TableBugType[],
  useCases: GetCampaignsByCidUsecasesApiResponse
) => {
  const bugsByUsecase: BugByUsecaseType[] = useCases?.map((useCase) => ({
    useCase,
    bugs: [],
  }));
  bugs.forEach((bug) => {
    const useCase = bugsByUsecase.find(
      (item) => item.useCase.id === bug.application_section.id
    );
    useCase?.bugs.push(bug);
  });
  return bugsByUsecase;
};
