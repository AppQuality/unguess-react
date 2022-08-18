import { UseCaseTemplate } from 'src/features/api/api';

export interface UseCase {
  id: number;
  title: string;
  functionality?: UseCaseTemplate;
  logged: boolean;
  description: string;
  link?: string;
}

export const emptyUseCase: UseCase = {
  id: 0,
  title: '',
  logged: false,
  description:
    '<h3>Descrizione della funzionalità</h3><p>Stai per testare la funzionalità “barra di ricerca” il cui scopo è quello di “cercare prodotti”</p><h3>Azioni da compiere per validare il funzionamento</h3><p><strong>Per testare il funzionamento:</strong></p><ul><li><p>Usa la barra di ricerca per cercare contenuti all’interno del sito, sia attraverso stringhe parziali che totali.</p></li><li><p>Usa eventuali opzioni di filtro e ordinamento</p></li></ul><p><strong>Assicurati che</strong><br>I contenuti trovati siano sempre coerenti con quanto desiderato, in base ai loro dettagli</p>',
  link: '',
};

export interface HowStep {
  test_description?: string;
  use_cases?: UseCase[];
}
