import { useEffect, useState } from 'react';
import {
  useGetUsersMeQuery,
  useGetUsersRolesQuery,
  useGetCompaniesSizesQuery,
} from 'src/features/api';
import { ProfileFormValues } from './valuesType';

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);

  const { data: userData, isLoading: isUserDataLoading } = useGetUsersMeQuery();
  const { data: rolesData, isLoading: isRolesDataLoading } =
    useGetUsersRolesQuery();
  const { data: companySizesData, isLoading: isCompanySizesLoading } =
    useGetCompaniesSizesQuery();

  useEffect(() => {
    if (userData && rolesData && companySizesData) {
      const roleObj = rolesData.find(
        (role) => role.name === userData.customer_role
      );
      const companySizeObj = companySizesData.find(
        (size) => size.name === userData.company_size
      );
      const initialValues: ProfileFormValues = {
        role: roleObj?.name || undefined,
        roleId: roleObj?.id || 0,
        companySize: companySizeObj?.name || '',
        companySizeId: companySizeObj?.id || 0,
        name: userData.first_name || '',
        surname: userData.last_name || '',
        email: userData.email || '',
      };
      setProfile(initialValues);
    }
  }, [userData, rolesData]);

  return {
    data: profile,
    isLoading: isUserDataLoading || isRolesDataLoading || isCompanySizesLoading,
    isFetching:
      isUserDataLoading || isRolesDataLoading || isCompanySizesLoading,
  };
};
