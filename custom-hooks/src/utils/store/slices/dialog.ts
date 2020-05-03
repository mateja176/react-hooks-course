export interface DialogState {
  isOpen: boolean;
}

export const initialDialogState: DialogState = {
  isOpen: false,
};

export enum DialogType {
  setIsDialogOpen = 'dialog/setIsOpen',
  toggleIsDialogOpen = 'dialog/toggleIsOpen',
}

export const createSetIsDialogOpen = (payload: DialogState['isOpen']) => ({
  type: DialogType.setIsDialogOpen,
  payload,
});
export type CreateSetIsDialogOpen = typeof createSetIsDialogOpen;
export type SetIsDialogOpenAction = ReturnType<CreateSetIsDialogOpen>;

export const createToggleIsDialogOpen = (payload: DialogState['isOpen']) => ({
  type: DialogType.toggleIsDialogOpen,
  payload,
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
