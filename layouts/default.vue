<template>
    <ClientOnly>
        <main class="flex flex-col min-h-screen bg-base-200">
            <NavBar />
            <NuxtPage />
        </main>
    </ClientOnly>
</template>

<script setup>

const user = userStore();


onMounted(() => {
    if (user.isLogin) {
        $fetch('/api/users/fetch', {
            method: 'GET',
            body: JSON.stringify({
                email: user.Email
            })
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((data) => {
            user.Tasks = new Map(Object.entries(data.tasks));
            user.TotalTime = new Map(Object.entries(data.totalTime));
        }).catch((err) => {
            console.error(err);
        });
        
        
    } else {
        const tasks = localStorage.getItem('tasks');
        if (tasks) {
            const parsed = JSON.parse(tasks);
            user.Tasks = new Map(Object.entries(parsed));
        }

        const totalTime = localStorage.getItem('totalTime');
        if (totalTime) {
            const parsed = JSON.parse(totalTime);
            user.TotalTime = new Map(Object.entries(parsed));
        }
    }
})

</script>