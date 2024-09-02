<template>
  <div class="sticky top-0 left-0 z-10 navbar bg-base-100 shadow-xl">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
          <li><NuxtLink to="/"><TasksIcon />Tasks</NuxtLink></li>
          <li><NuxtLink to="/summarize"><SummarizeIcon />Summarize</NuxtLink></li>
        </ul>
      </div>
      <a class="btn btn-ghost text-xl"><NuxtLink to="/">TimeIt</NuxtLink></a>

    </div>

    <div class="navbar-end">
      <label class="flex items-center cursor-pointer gap-2">
          <svg class="w-6 h-6 text-base-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
          </svg>
          <input data-toggle-theme="dark,light" data-act-class="ACTIVECLASS" type="checkbox"  class="toggle theme-controller"/>
          <svg class="w-6 h-6 text-base-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
          </svg>
      </label>

      <div class=" divider divider-horizontal m-0"></div>

      <div class="dropdown dropdown-end">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
          
          <div class="w-10 rounded-full">
            <img
              v-if="user.isLogin"
              :alt="user.Username"
              :src="user.Avatar"
            />
            <UserIcon v-else />
          </div>
        </div>
        <ul
          v-if="user.isLogin"
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li class="menu-title">{{ `Hello, ${user.Username}!` }}</li>
          <li><a @click="logOut">Logout</a></li>
        </ul>
        <ul
          v-else
          tabindex="0"
          class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
          <li><a @click="signIn">Sign In</a></li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script setup>
import { userStore } from '#imports';
import { useSupabaseClient } from '#imports';
import { themeChange } from 'theme-change';
import { ThemeStore } from '@/stores/theme';
import { initTask } from '~/composables/task-manager';


const client = useSupabaseClient();
const user = userStore();
const themeStore = ThemeStore();

const router = useRouter();


function themeInit() {
  if (localStorage.getItem('theme') === null) {
    localStorage.setItem('theme', 'light');
    themeStore.isLight = true;
  }  
  themeChange(false);
}

function loadTasks() {
if (user.isLogin) {
    initTask();

  } else {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      const parsed = JSON.parse(tasks);
      user.Tasks = new Map(Object.entries(parsed));
    }
  }
}

onMounted(async () => {
  themeInit();
  const { data, error } = await client.auth.getUser();
  if (!error) {
    user.login(
      data.user.user_metadata.email,
      data.user.user_metadata.full_name,
      data.user.user_metadata.avatar_url
    );
  }
  loadTasks()
})


async function signIn() {
  await client.auth.signInWithOAuth({
  "provider": 'google',
  });
}

async function logOut() {
  await client.auth.signOut();
  user.logout();
  user.Tasks = new Map();
  user.TotalTime = new Map();
  localStorage.removeItem('tasks');
  localStorage.removeItem('totalTime');
  router.push('/');

}

</script>