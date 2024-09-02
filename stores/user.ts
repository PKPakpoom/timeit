import { defineStore } from 'pinia'

type Task = {
  duration: number,
  elapse: number,
}


export const userStore = defineStore({
  id: 'userStore',
  state: () => ({
    Email: null as string | null,
    Username: null as string | null,
    Avatar: null as string | null,
    isLogin: false,
    Tasks: new Map<string, Task>(),
    TotalTime: new Map<string, number>(),
  }),
  actions: {
    login(email: string, username: string, avatar: string) {
      this.Email = email
      this.Username = username
      this.Avatar = avatar
      this.isLogin = true
    },
    logout() {
      this.Email = null
      this.Username = null
      this.Avatar = null
      this.isLogin = false
    },
  }

})
