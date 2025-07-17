import { useEffect, useState } from 'react';
import { useGetUsersMeQuery, useGetUsersRolesQuery } from 'src/features/api';
import { ProfileFormValues } from './valuesType';

export const useProfileData = () => {
  const [profile, setProfile] = useState<ProfileFormValues | null>(null);

  const { data: userData, isLoading: isUserDataLoading } = useGetUsersMeQuery();
  const { data: rolesData, isLoading: isRolesDataLoading } =
    useGetUsersRolesQuery();

  useEffect(() => {
    if (userData && rolesData) {
      const roleObj = rolesData.find(
        (role) => role.name === userData.customer_role
      );
      const initialValues: ProfileFormValues = {
        role: roleObj?.name || undefined,
        roleId: roleObj?.id || 0,
        name: userData.first_name || '',
        surname: userData.last_name || '',
        email: userData.email || '',
      };
      setProfile(initialValues);
    }
  }, [userData, rolesData]);

  return {
    data: profile,
    isLoading: isUserDataLoading || isRolesDataLoading,
    isFetching: isUserDataLoading || isRolesDataLoading,
  };
};
