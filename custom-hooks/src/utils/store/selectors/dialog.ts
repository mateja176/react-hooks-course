import { compose } from '../../utils';
import { State } from '../reducer';

export const selectDialog = ({ dialog }: State) => dialog;

export const selectIsDialogOpen = compose(selectDialog, ({ isOpen }) => isOpen);
