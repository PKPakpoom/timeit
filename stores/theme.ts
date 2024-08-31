import { defineStore } from 'pinia'

export const ThemeStore = defineStore({
  id: 'ThemeStore',
  state: () => ({  
    isLight: false,
  }),
})
