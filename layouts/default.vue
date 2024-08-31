<template>
    <ClientOnly>
        <NavBar />
        <div class="flex-1 overflow-y-auto">
            <NuxtPage />
        </div>
    </ClientOnly>

</template>

<script setup>
import { themeChange } from 'theme-change';
import { ThemeStore } from '@/stores/theme';

const themeStore = ThemeStore()

onMounted(() => {
    if (localStorage.getItem('theme') === null) {
        localStorage.setItem('theme', 'light');
        themeStore.isLight = true;
    }
    themeChange(false);
});

</script>