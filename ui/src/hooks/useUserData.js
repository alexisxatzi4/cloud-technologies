import {getItem} from "../lib/storage";

export default function useUserData() {

  const user =  getItem("user") ? JSON.parse(getItem("user")) : null;
  const isDealership = user?.isCitizen


  return { user, isDealership};
}
