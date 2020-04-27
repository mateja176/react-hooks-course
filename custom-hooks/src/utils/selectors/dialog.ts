import { State } from '../reducer';
import { compose } from '../utils';

export const selectDialog = ({ dialog }: State) => dialog;

export const selectIsDialogOpen = compose(selectDialog, ({ isOpen }) => isOpen);
