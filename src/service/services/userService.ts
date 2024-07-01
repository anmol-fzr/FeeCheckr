import { axiosInst } from "@/config";
import { IResUsers } from "@/types";
import { getQueryKey } from "@/utils";

// This Pattern can be used with tanstack-query to avoid duplicate and non-consistent queryKeys while using useQuery
const SEARCH = (page = 1, size = 10) => {
  const path = `/users?page=${page}&size=${size}`;
  return {
    query: () => axiosInst.get<IResUsers>(path),
    getKey: () => getQueryKey(path)
  }
}

const USERS = {
  SEARCH,
} as const

export { USERS }
