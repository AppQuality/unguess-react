import { Dispatch } from "redux";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  refreshUser,
  loginUser,
  getProfile,
  updateProfile,
  getFiscalProfile,
  updateFiscalProfile,
  deleteUser,
  updateDeletionReason,
  closeDeleteModal,
  openDeleteModal,
} from "./actionCreators";
import { operations } from "src/utils/schema";

export default (): UserStatus => {
  const {
    user,
    loading,
    loadingProfile,
    deletionReason,
    customUserFields,
    error,
    deleteModalOpen,
  }: {
    user: UserData;
    loading: boolean;
    loadingProfile: boolean;
    customUserFields?: operations["get-customUserFields"]["responses"]["200"]["content"]["application/json"];
    error?: string;
    deletionReason?: string;
    deleteModalOpen: boolean;
  } = useSelector(
    (state: GeneralState) => ({
      user: state.user.user,
      loading: state.user.loading,
      customUserFields: state.user.customUserFields,
      loadingProfile: state.user.loadingProfile,
      deletionReason: state.user.deletionReason,
      error: state.user.error,
      deleteModalOpen: state.user.isDeleteModalOpen,
    }),
    shallowEqual
  );

  const dispatch: Dispatch<any> = useDispatch();

  return {
    refresh: (additionalFields?: string) =>
      dispatch(refreshUser(additionalFields)),
    login: (data: UserLoginData) => dispatch(loginUser(data)),
    getProfile: () => dispatch(getProfile()),
    updateProfile: (data: UserData) => dispatch(updateProfile(data)),
    getFiscalProfile: () => dispatch(getFiscalProfile()),
    updateFiscalProfile: (data) => dispatch(updateFiscalProfile(data)),
    user: user,
    customUserFields: customUserFields,
    isLoading: loading,
    isProfileLoading: loadingProfile,
    deletion: {
      deletionReason: deletionReason,
      deleteUser: (currentLanguage: string) =>
        dispatch(deleteUser(currentLanguage)),
      updateDeletionReason: (reason: string) =>
        dispatch(updateDeletionReason(reason)),
      isDeleteModalOpen: deleteModalOpen,
      openDeleteModal: () => dispatch(openDeleteModal()),
      closeDeleteModal: () => dispatch(closeDeleteModal()),
    },
    error: error,
  };
};
