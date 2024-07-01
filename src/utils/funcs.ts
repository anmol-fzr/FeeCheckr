import { create } from "zustand";
import { envs } from "./envs";
import { baseURL } from "@/config";


function registerStore(store: ReturnType<typeof create>, name: string) {
  if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__?.connect && envs.DEV) {
    const connection = window?.__REDUX_DEVTOOLS_EXTENSION__?.connect({
      name,
    })
    connection?.init(store.getState());
    store.subscribe((newState) => connection?.send(name, newState));
    console.info(`${name} Registered & Subscribed in Redux DevTools 🔧`)
  }
}

const getQueryKey = (path: string) => {
  const uri = new URL(path, baseURL)
  const pathnames: (Record<string, string> | string)[] = uri.pathname.split("/")

  pathnames.shift()

  const obj: Record<string, string> = {}

  if (uri.searchParams.size === 0) {
    return pathnames
  }

  for (const [key, value] of uri.searchParams.entries()) {
    obj[key] = value
  }
  pathnames.push(obj)
  return pathnames
}

export { registerStore, getQueryKey }
