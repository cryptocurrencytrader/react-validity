import moment from "moment";

import { optional, trim } from "../factories";

export default function date(format?: string) {
  return trim(optional((value) => moment(value, format, true).isValid()));
}
