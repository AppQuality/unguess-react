const useIcon = (_withValidation: boolean = true) => null;

export const useIconWithValidation = () => useIcon(true);

export const useIconWithoutValidation = () => useIcon(false);

export default useIcon;
