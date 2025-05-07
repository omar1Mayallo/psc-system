import {enqueueSnackbar} from "notistack";
import {ResErrorsI} from "../../api";
import {AxiosError} from "axios";

export default function catchAndNotifyErrors(error: AxiosError<ResErrorsI>) {
  console.log(error);
  // error : string[]
  const errArr = error.response?.data.errors;
  if (error.response?.data.status === "validation-error") {
    errArr?.forEach((err) => enqueueSnackbar(err, {variant: "error"}));
  }

  // error : string
  const err = error?.response?.data.message;
  if (err) {
    enqueueSnackbar(err, {variant: "error"});
  }
}
