<template>
    <div class="drawer drawer-mobile">
      <!-- Drawer Toggle -->
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      
      <!-- Main Content -->
      <div class="drawer-content">
        <!-- Navbar -->
        <div class="navbar bg-base-200">
          <div class="flex-none">
            <!-- Drawer Button -->
            <label for="my-drawer" tabindex="0" role="button" class="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 base-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
          </div>
          <div class="flex-1">
            <NuxtLink to="/" class="btn btn-ghost text-xl hidden sm:flex">
              <span>TimeIt</span>
            </NuxtLink>
          </div>
          <label class="flex items-center cursor-pointer gap-2">
            <svg class="w-6 h-6 text-base-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 0 1-.5-17.986V3c-.354.966-.5 1.911-.5 3a9 9 0 0 0 9 9c.239 0 .254.018.488 0A9.004 9.004 0 0 1 12 21Z"/>
            </svg>
            <input :checked="isLight" data-toggle-theme="light,dark" data-act-class="ACTIVECLASS" type="checkbox" class="toggle theme-controller"/>
            <svg class="w-6 h-6 text-base-content" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5V3m0 18v-2M7.05 7.05 5.636 5.636m12.728 12.728L16.95 16.95M5 12H3m18 0h-2M7.05 16.95l-1.414 1.414M18.364 5.636 16.95 7.05M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"/>
            </svg>
          </label>
          <div class="flex-none">
            <button class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
  
      <!-- Sidebar -->
      <div class="drawer-side">
        <label for="my-drawer" class="drawer-overlay"></label>
        <ul class="menu p-4 w-80 bg-base-200 h-full">
          <li><NuxtLink to="/"><TasksIcon />Tasks</NuxtLink></li>
          <li><NuxtLink to="/summarize"><SummarizeIcon />Summarize</NuxtLink></li>
          <li><NuxtLink to="/settings"><SettingIcon />Settings</NuxtLink></li>
        </ul>
      </div>
    </div>
</template>
  
  

<script setup lang="ts">
import { themeChange } from 'theme-change';

const isLight = ref(false);

onMounted(() => {
    isLight.value = localStorage.getItem('theme') === 'light' ? true : false;
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'light');
    }
    themeChange(false);
});

// onNuxtReady(async () => {
//     if (localStorage.getItem('theme') === null) {
//         localStorage.setItem('theme', 'dark');
//     }
//     themeChange(false);
// })


</script>