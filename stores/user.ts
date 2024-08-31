import { defineStore } from 'pinia'

type Task = {
  duration: number,
  elapse: number,
}

export const userStore = defineStore({
  id: 'userStore',
  state: () => ({
    Username: null as string | null,
    isLogin: false,
    Tasks: new Map<string, Task>()
  }),
  actions: {
    async init() {
      // TODO: load from supabase
    }
  }
})
