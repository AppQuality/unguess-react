import { MD } from '@appquality/unguess-design-system';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';
import { Grape } from './Grape';

interface UsecaseSectionProps {
  usecase: {
    usecaseId: number;
    usecaseTitle: string;
    grapes: {
      title: string;
      severity: string;
      usersNumber: number;
      observations: {
        id: number;
        title: string;
        description: string;
        start: number;
        end: number;
        quotes: string;
        uxNote: string;
      }[];
    }[];
  };
}

export const UsecaseSection = ({ usecase }: UsecaseSectionProps) => {
  const grapes = useMemo(
    () =>
      usecase.grapes.map((grape) => ({
        ...grape,
        internalId: uuidv4(),
      })),
    [usecase.grapes]
  );

  return (
    <section>
      <MD>
        {usecase.usecaseTitle} ({usecase.grapes.length})
      </MD>
      {grapes.map((grape) => (
        <Grape key={grape.internalId} grape={grape} />
      ))}
    </section>
  );
};
