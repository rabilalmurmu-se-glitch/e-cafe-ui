// in e.g. src/utils/notifications.js
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const notyf = new Notyf({
  duration: 3000,
  position: { x: "right", y: "top" },
  // other global config…
});

export const notifySuccess = (msg: string) => notyf.success(msg);
export const notifyError = (msg: string) => notyf.error(msg);
