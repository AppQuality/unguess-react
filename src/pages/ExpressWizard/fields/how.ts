import { UseCase } from 'src/features/express/expressSlice';

export interface HowStep {
  test_description?: string;
  use_cases?: UseCase[];
}
