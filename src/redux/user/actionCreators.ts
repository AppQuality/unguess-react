import API from "../../utils/api";
import * as actionTypes from "./actionTypes";

export * from "./actions/getCustomUserFields";
export * from "./actions/getFiscalProfile";
export * from "./actions/getProfile";
export * from "./actions/loginUser";
export * from "./actions/refreshUser";
export * from "./actions/updateFiscalProfile";
export * from "./actions/updateProfile";

export const updateDeletionReason = (reason: string) => {
  return async (dispatch: UserDispatchType) => {
    dispatch({
      type: actionTypes.UPDATE_DELETION_REASON,
      data: { reason },
    });
  };
};
export const deleteUser = (currentLanguage: string) => {
  return async (dispatch: UserDispatchType, getState: () => GeneralState) => {
    const { deletionReason } = getState().user;
    await API.deleteUser({
      reason: deletionReason || "",
    });
    await fetch("/wp-admin/admin-ajax.php?action=appq_wp_logout");
    window.location.href = `/${currentLanguage}goodbye/`;
    console.log(deletionReason);
  };
};

export const openDeleteModal = () => {
  return async (dispatch: UserDispatchType) => {
    dispatch({
      type: actionTypes.OPEN_DELETE_MODAL,
    });
  };
};

export const closeDeleteModal = () => {
  return async (dispatch: UserDispatchType) => {
    dispatch({
      type: actionTypes.CLOSE_DELETE_MODAL,
    });
  };
};
