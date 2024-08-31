<template>
    <div class="card bg-base-200 w-72 md:w-96 shadow-xl z-[-1]">
        <div class="card-body items-center text-center">
            <h1 class="text-4xl font-bold mb-4">{{ props.taskName }}</h1>

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
            <div class="card-actions">
            <button class="btn btn-primary btn-wide">Start</button>
        </div>
    </div>
    <progress class="progress progress-success w-auto mx-10 mb-4" :value="props.elapse" :max="props.duration"></progress>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['duration', 'taskName', 'elapse'])


let hours = Math.floor(props.duration / (60 * 60));
let minutes = Math.floor(props.duration / 60) % 60;
let seconds = props.duration % 60;




</script>