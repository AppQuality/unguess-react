import {
  Checkbox,
  FormField as Field,
  Hint,
  Label,
  Span,
} from '@appquality/unguess-design-system';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { components } from 'src/common/schema';
import { useModule } from 'src/features/modules/useModule';
import { useModuleConfiguration } from 'src/features/modules/useModuleConfiguration';
import { useValidation } from 'src/features/modules/useModuleValidation';
import styled from 'styled-components';
import { italyRegions } from '../data/locationRegions';

const RegionsContainer = styled.div`
  padding-left: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

type RegionPanelProps = {
  validate?: ReturnType<typeof useValidation<'locality'>>['validate'];
};

// Helper to get the region area from the area array
type ModuleOutput = components['schemas']['OutputModuleLocality'];
const getRegionArea = (areaArr: ModuleOutput) =>
  areaArr.find((a) => a.type === 'region') || { type: 'region', values: [] };

export const RegionPanel = ({ validate }: RegionPanelProps) => {
  const { t } = useTranslation();
  const { value, setOutput } = useModule('locality');
  const areaArr: ModuleOutput = value?.output || [];
  const regionArea = getRegionArea(areaArr);
  const selectedRegions = regionArea.values || [];
  const { getPlanStatus } = useModuleConfiguration();

  const updateRegions = useCallback(
    (newRegions: string[]) => {
      const newAreaArr: ModuleOutput = [
        ...areaArr.filter((a: ModuleOutput[0]) => a.type !== 'region'),
        { type: 'region', values: newRegions },
      ];
      setOutput(newAreaArr);
      if (validate) {
        validate({
          output: newAreaArr,
          variant: value?.variant || 'default',
        });
      }
    },
    [areaArr, setOutput, validate, value?.variant]
  );

  return (
    <div
      role="group"
      aria-label={t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_REGION')}
      style={{ marginTop: appTheme.space.lg, paddingLeft: appTheme.space.xl }}
    >
      <div
        style={{
          paddingTop: appTheme.space.xs,
          marginBottom: appTheme.space.md,
        }}
      >
        <Label>{t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_REGION')}</Label>
        <Span style={{ color: appTheme.palette.red[600] }}>*</Span>
        <Hint>{t('__PLAN_PAGE_MODULE_LOCALITY_SELECT_REGION_HINT')}</Hint>
      </div>
      {italyRegions.map((marketArea) => {
        const marketAreaId = `market-checkbox-${marketArea.marketArea.value}`;
        return (
          <div key={marketArea.marketArea.value}>
            <Field>
              <Checkbox
                disabled={getPlanStatus() !== 'draft'}
                id={marketAreaId}
                checked={marketArea.regions.some((region) =>
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
                <Label
                  htmlFor={`market-checkbox-${marketArea.marketArea.value}`}
                  isRegular
                >
                  {marketArea.marketArea.label}
                </Label>
              </Checkbox>
            </Field>
            {marketArea.regions.some((region) =>
              selectedRegions.includes(region.value)
            ) && (
              <RegionsContainer>
                {marketArea.regions.map((region) => {
                  const regionId = `region-checkbox-${region.value}`;
                  return (
                    <Field key={region.value} style={{ margin: 0 }}>
                      <Checkbox
                        disabled={getPlanStatus() !== 'draft'}
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
            )}
          </div>
        );
      })}
    </div>
  );
};
