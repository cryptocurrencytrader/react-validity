import { optional, trim } from "../factories";

const email = trim(optional((value) => {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(value);
}));

export default email;
