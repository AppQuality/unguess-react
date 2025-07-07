// todo: mappare le regioni dal pacchetto comuni-province-regioni
import Region from 'comuni-province-regioni/lib/region';

export const italyRegions = [
  {
    marketArea: { label: 'Nord Ovest', value: 'nord-ovest' },
    regions: [
      { label: Region.LOMBARDIA, value: Region.LOMBARDIA },
      { label: Region.PIEMONTE, value: Region.PIEMONTE },
      { label: Region.LIGURIA, value: Region.LIGURIA },
      { label: Region.VALLE_DAOSTA, value: Region.VALLE_DAOSTA },
    ],
  },
  {
    marketArea: { label: 'Nord Est', value: 'nord-est' },
    regions: [
      { label: Region.TRENTINO_ALTO_ADIGE, value: Region.TRENTINO_ALTO_ADIGE },
      { label: Region.VENETO, value: Region.VENETO },
      {
        label: Region.FRIULI_VENEZIA_GIULIA,
        value: Region.FRIULI_VENEZIA_GIULIA,
      },
      { label: Region.EMILIA_ROMAGNA, value: Region.EMILIA_ROMAGNA },
    ],
  },
  {
    marketArea: { label: 'Centro', value: 'centro' },
    regions: [
      { label: Region.TOSCANA, value: Region.TOSCANA },
      { label: Region.UMBRIA, value: Region.UMBRIA },
      { label: Region.MARCHE, value: Region.MARCHE },
      { label: Region.LAZIO, value: Region.LAZIO },
    ],
  },
  {
    marketArea: { label: 'Sud e Isole', value: 'sud-e-isole' },
    regions: [
      { label: Region.ABRUZZO, value: Region.ABRUZZO },
      { label: Region.MOLISE, value: Region.MOLISE },
      { label: Region.CAMPANIA, value: Region.CAMPANIA },
      { label: Region.PUGLIA, value: Region.PUGLIA },
      { label: Region.BASILICATA, value: Region.BASILICATA },
      { label: Region.CALABRIA, value: Region.CALABRIA },
      { label: Region.SICILIA, value: Region.SICILIA },
      { label: Region.SARDEGNA, value: Region.SARDEGNA },
    ],
  },
];
