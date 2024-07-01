import { create } from "zustand";
import { envs } from "./envs";

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


export { registerStore }
