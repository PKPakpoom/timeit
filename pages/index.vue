<template>
    <div class="flex flex-col items-center gap-4 m-4 ">
        <button class="btn btn-outline w-max" @click="toggleNew">
            <PlusIcon />
            New Task
        </button>

        <div
            v-show="showNew"
            class="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-50 flex items-center justify-center"
        >
            <div class="bg-base-100 p-8 rounded-lg shadow-lg">
                <h2 class="text-xl font-bold mb-4 text-center">New Task</h2>

                <label class="form-control w-full max-w-xs mb-4">
                    <div class="label">
                        <span class="label-text">Task Name</span>
                    </div>
                    <input v-model="taskName" type="text" placeholder="Task Name" class="input input-bordered w-full max-w-xs" />
                </label>

                <div class="flex space-x-4 mb-4">
                    <label class="flex-shrink-0 w-24">
                        <div class="label">
                            <span class="label-text">Hours</span>
                        </div>
                        <input v-model="hours" type="text" placeholder="00" class="input input-bordered w-full" />
                    </label>

                    <label class="flex-shrink-0 w-24">
                        <div class="label">
                            <span class="label-text">Minutes</span>
                        </div>
                        <input v-model="minutes" type="text" placeholder="00" class="input input-bordered w-full" />
                    </label>

                    <label class="flex-shrink-0 w-24">
                        <div class="label">
                            <span class="label-text">Seconds</span>
                        </div>
                        <input v-model="seconds" type="text" placeholder="00" class="input input-bordered w-full" />
                    </label>
                </div>

                <div class="flex justify-between">
                    <button class="btn btn-outline w-32 mt-4" @click="toggleNew">
                        Close
                    </button>
                    <button class="btn btn-primary w-32 mt-4" @click="addTask">
                        Create
                    </button>


                </div>
            </div>
        </div>
        <div
            class="m-4 grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
            <TimerCard
                v-for="v, i in user.Tasks"
                :taskName="v[0]"
                :duration="v[1].duration"
                :elapse="v[1].elapse"
            />
        </div>
        
    </div>
</template>

<script setup lang="ts">
import { userStore } from '#imports';

const showNew = ref<boolean>(false);

const taskName = ref<string>('');
const hours = ref<number>(0);
const minutes = ref<number>(0);
const seconds = ref<number>(0);

const user = userStore();


for (let i = 1; i < 10; i++) {
    user.Tasks.set(`Task ${i}`, {
        duration: 60 * 60,
        elapse: 60 * 60 - 60 * 60 / i,
    })
}

function toggleNew(): void {
    showNew.value = !showNew.value;
}

function addTask(): void {
    user.Tasks.set(taskName.value, {
        duration: (Number(hours.value) * 60 * 60) + Number(minutes.value) * 60 + Number(seconds.value),
        elapse: 0,
    })

    toggleNew();
}


</script>
