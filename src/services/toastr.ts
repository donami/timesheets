import { actions as toastrActions } from 'react-redux-toastr';

export interface ToastrOptions {
  title: string;
  message: string;
}

const success = (toastr: ToastrOptions): any => {
  return toastrActions.add({
    type: 'success',
    title: toastr.title,
    message: toastr.message,
    options: {
      showCloseButton: true,
    },
  });
};

const error = (toastr: ToastrOptions): any => {
  return toastrActions.add({
    type: 'error',
    title: toastr.title,
    message: toastr.message,
    options: {
      showCloseButton: true,
    },
  });
};

export { success, error };
