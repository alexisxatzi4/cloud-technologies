import {getItem} from "../lib/storage";

export default function useUserData() {

  const user =  getItem("user") ? JSON.parse(getItem("user")) : null;
  const isCitizen = user?.citizen
  const afm = user?.afm

  return { user, isCitizen, afm};
}
