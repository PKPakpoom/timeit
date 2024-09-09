<template>
  <div v-if="loading" class="flex justify-center items-center h-screen">
    Loading...
  </div>
  <div v-else-if="task" class="flex flex-grow justify-center items-center p-4">
    <div class="card bg-base-100 h-full shadow-xl">
      <div class="card-body gap-8">
        <h2 class="card-title justify-center text-8xl md:text-6xl">{{ taskId }}</h2>

        <div class="flex flex-col justify-center items-center">
          <span class="countdown font-mono text-2xl">
            <span :style="`--value:${Math.floor(task.duration / (60 * 60))};`"></span>
            :
            <span :style="`--value:${Math.floor(task.duration / 60) % 60};`"></span>
            :
            <span :style="`--value:${task.duration % 60};`"></span>
          </span>
          <p>Timer</p>
          <div class="divider"></div>
          <div
            class="md:radial-progress text-primary md:m-0"
            :style="`--value:${task.elapse * 100 / task.duration}; --size:16rem; --thickness: 4px;`"
            role="progressbar"
          >
            <span class="countdown justify-center items-center font-mono text-base-content text-6xl md:text-4xl">
              <span :style="`--value:${hours};`"></span>
              :
              <span :style="`--value:${minutes};`"></span>
              :
              <span :style="`--value:${seconds};`"></span>
            </span>
          </div>
        </div>

        <div class="card-actions justify-center">
          <button class="btn btn-lg btn-success" @click.stop="isPlaying = !isPlaying" v-if="!isPlaying">
            <PlayIcon />
            Start
          </button>
          <button class="btn btn-lg btn-outline" @click.stop="isPlaying = !isPlaying" v-else>
            <PauseIcon />
            Pause
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { userStore } from '#imports';
import { saveTask } from '#imports';
import { format, parse, compareAsc } from 'date-fns';
import { ref, watch, onMounted, onUnmounted } from 'vue';

const user = userStore();
const route = useRoute();
const router = useRouter();
const taskId = route.params.taskId;

const task = ref(null);
const loading = ref(true);
const isPlaying = ref(false);

const hours = ref(0);
const minutes = ref(0);
const seconds = ref(0);

onMounted(async () => {
  const fetchedTask = user.Tasks.get(taskId);
  if (!fetchedTask) {
    router.push('/');
  } else {
    task.value = fetchedTask;
    hours.value = Math.floor((task.value.duration - task.value.elapse) / (60 * 60));
    minutes.value = Math.floor((task.value.duration - task.value.elapse) / 60) % 60;
    seconds.value = (task.value.duration - task.value.elapse) % 60;
  }
  loading.value = false;
});

let interval = null;

watch(isPlaying, (v) => {
  if (v) {
    interval = setInterval(() => {
      if (task.value.elapse >= task.value.duration) {
        clearInterval(interval);
        isPlaying.value = false;
        return;
      }
      const today = format(new Date(), 'dd/MM/yyyy');

      if (user.TotalTime.has(today)) {
        user.TotalTime.set(today, user.TotalTime.get(today) + 1);
      } else {
        user.TotalTime.set(today, 1);

        user.TotalTime = new Map([...user.TotalTime.entries()].sort(([dateA], [dateB]) => {
          const parsedDateA = parse(dateA, 'dd/MM/yyyy', new Date());
          const parsedDateB = parse(dateB, 'dd/MM/yyyy', new Date());
          return compareAsc(parsedDateA, parsedDateB);
        }));
      }

      task.value.elapse += 1;
      saveTask();
      hours.value = Math.floor((task.value.duration - task.value.elapse) / (60 * 60));
      minutes.value = Math.floor((task.value.duration - task.value.elapse) / 60) % 60;
      seconds.value = (task.value.duration - task.value.elapse) % 60;
    }, 1000);
  } else {
    if (interval != null) {
      clearInterval(interval);
      interval = null;
      saveTask();
    }
  }
});

onUnmounted(() => {
  if (interval != null) {
    clearInterval(interval);
    interval = null;
  }
});
</script>
