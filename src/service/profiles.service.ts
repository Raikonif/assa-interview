import axios from "axios";
import { BACK_API_ELEMENTS } from "@/constants/general.constants.ts";

const getProfiles = async () => {
  try {
    return await axios.get(`${BACK_API_ELEMENTS}`);
  } catch (error) {
    console.error("Error getting profiles", error);
    throw error;
  }
};

export { getProfiles };
