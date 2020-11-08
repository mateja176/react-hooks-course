export interface DialogState {
  isOpen: boolean;
}

export const initialDialogState: DialogState = {
  isOpen: false,
};

// * cannot be an enum since any two fields on the same enum are of the same type
// * and the actions type are required to be of different types
// * in order for the switch reducer to distinguish actions on a per case basis
export const DialogType = {
  setIsDialogOpen: 'dialog/setIsOpen',
  toggleIsDialogOpen: 'dialog/toggleIsOpen',
} as const;

export const createSetIsDialogOpen = (payload: DialogState['isOpen']) => ({
  type: DialogType.setIsDialogOpen,
  payload,
});
export type CreateSetIsDialogOpen = typeof createSetIsDialogOpen;
export type SetIsDialogOpenAction = ReturnType<CreateSetIsDialogOpen>;

export const createToggleIsDialogOpen = () => ({
  type: DialogType.toggleIsDialogOpen,
});
export type CreateToggleIsDialogOpen = typeof createToggleIsDialogOpen;
export type ToggleIsDialogOpenAction = ReturnType<CreateToggleIsDialogOpen>;

export type DialogAction = SetIsDialogOpenAction | ToggleIsDialogOpenAction;

export const dialog = (
  state: DialogState,
  action: DialogAction,
): DialogState => {
  switch (action.type) {
    case DialogType.setIsDialogOpen:
      return {
        ...state,
        isOpen: action.payload,
      };
    case DialogType.toggleIsDialogOpen:
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
};
