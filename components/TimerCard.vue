<template>
    <div class="card bg-base-100 w-72 md:w-96 shadow-xl">
        <div class="card-body items-center">
            <h1 class="text-4xl font-bold text-center justify-start w-1/2">{{ props.taskName }}</h1>
            <div class="grid auto-cols-max grid-flow-col gap-5 text-center">
                <div class="flex flex-col">
                    <span class="countdown font-mono text-5xl">
                    <span :style="`--value:${hours};`"></span>
                    </span>
                    hour{{ hours > 1 ? 's' : '' }}
                </div>
                <div class="flex flex-col">
                    <span class="countdown font-mono text-5xl">
                    <span :style="`--value:${minutes};`"></span>
                    </span>
                    min{{ minutes > 1 ? 's' : '' }}
                </div>
                <div class="flex flex-col">
                    <span class="countdown font-mono text-5xl">
                    <span :style="`--value:${seconds};`"></span>
                    </span>
                    sec{{ seconds > 1 ? 's' : '' }}
                </div>
            </div>
            <div class="card-actions w-full justify-center">
                <button class="btn btn-error btn-outline w-1/4" @click="deleteTask(props.taskName)">Delete</button>
                <button class="btn btn-primary w-1/2" @click="router.push(`/tasks/${taskName}`)">Start</button>

            </div>
        </div>
    <progress class="progress progress-success w-auto mx-10 mb-4" :value="props.elapse" :max="props.duration"></progress>
    </div>
</template>

<script setup lang="ts">
import { deleteTask } from '~/composables/task-manager';

const props = defineProps(['duration', 'taskName', 'elapse'])
const router = useRouter();


let hours = Math.floor((props.duration - props.elapse) / (60 * 60));
let minutes = Math.floor((props.duration - props.elapse) / 60) % 60;
let seconds = (props.duration - props.elapse) % 60;


</script>