import {
  FormField as Field,
  Checkbox,
  Label,
} from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { italyRegions } from './locationRegions';
import { useTranslation } from 'react-i18next';
import Region from 'comuni-province-regioni/lib/region';

const RegionsContainer = styled.div`
  padding-left: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

type RegionPanelProps = {
  value: any;
  setOutput: (output: any) => void;
};

// Helper to get the region area from the area array
type AreaType = { type: string; values: string[] };
const getRegionArea = (areaArr: AreaType[] = []) =>
  areaArr.find((a) => a.type === 'region') || { type: 'region', values: [] };

export function RegionPanel({ value, setOutput }: RegionPanelProps) {
  const { t } = useTranslation();
  const areaArr: AreaType[] = value || [];
  const regionArea = getRegionArea(areaArr);
  const selectedRegions = regionArea.values || [];

  const updateRegions = (newRegions: string[]) => {
    const newAreaArr: AreaType[] = [
      ...areaArr.filter((a: AreaType) => a.type !== 'region'),
      { type: 'region', values: newRegions },
    ];
    setOutput(newAreaArr);
  };

  return (
    <div
      role="group"
      aria-label={t('__PLAN_PAGE_MODULE_LOCATION_SELECT_REGION')}
    >
      <Label>{t('__PLAN_PAGE_MODULE_LOCATION_SELECT_REGION')}</Label>
      {italyRegions.map((marketArea) => (
        <div key={marketArea.marketArea.value}>
          <Field>
            <Checkbox
              checked={marketArea.regions.every((region) =>
                selectedRegions.includes(region.value)
              )}
              onChange={() => {
                const allSelected = marketArea.regions.every((region) =>
                  selectedRegions.includes(region.value)
                );
                let newRegions;
                if (allSelected) {
                  const regionValues = marketArea.regions.map(
                    (reg) => reg.value as string
                  );
                  newRegions = selectedRegions.filter(
                    (r: string) => !(regionValues as string[]).includes(r)
                  );
                } else {
                  const current = new Set(selectedRegions);
                  marketArea.regions.forEach((region) =>
                    current.add(region.value)
                  );
                  newRegions = Array.from(current);
                }
                updateRegions(newRegions);
              }}
              indeterminate={(() => {
                const regionValues = marketArea.regions.map(
                  (reg) => reg.value as string
                );
                return (
                  selectedRegions.some((r: string) =>
                    (regionValues as string[]).includes(r)
                  ) &&
                  !marketArea.regions.every((region) =>
                    selectedRegions.includes(region.value as string)
                  )
                );
              })()}
            >
              <Label isRegular>{marketArea.marketArea.label}</Label>
            </Checkbox>
          </Field>
          <RegionsContainer>
            {marketArea.regions.map((region) => {
              const regionId = `region-checkbox-${region.value}`;
              return (
                <Field key={region.value} style={{ margin: 0 }}>
                  <Checkbox
                    id={regionId}
                    value={region.value}
                    checked={selectedRegions.includes(region.value)}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      let newRegions;
                      if (isChecked) {
                        newRegions = [...selectedRegions, region.value];
                      } else {
                        newRegions = selectedRegions.filter(
                          (r: string) => r !== region.value
                        );
                      }
                      updateRegions(newRegions);
                    }}
                  >
                    <Label htmlFor={regionId}>{region.label}</Label>
                  </Checkbox>
                </Field>
              );
            })}
          </RegionsContainer>
        </div>
      ))}
    </div>
  );
}
