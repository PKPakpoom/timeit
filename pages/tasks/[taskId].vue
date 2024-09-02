<template>
  <div class="flex flex-grow justify-center items-center p-4" v-if="user.Tasks.get(taskId)">
    <div class="card bg-base-100 h-full shadow-xl">
      <div class="card-body gap-8">
        <h2 class="card-title justify-center text-8xl md:text-6xl">{{ taskId }}</h2>

        
        
        <div class="flex flex-col justify-center items-center">
          <span class="countdown font-mono text-2xl">
            <span :style="`--value:${Math.floor(user.Tasks.get(taskId).duration / (60 * 60))};`"></span>
            :
            <span :style="`--value:${Math.floor(user.Tasks.get(taskId).duration / 60) % 60};`"></span>
            :
            <span :style="`--value:${user.Tasks.get(taskId).duration % 60};`"></span>
          </span>
          <p>Timer</p>
          <div class="divider"></div>
          <div
            class="md:radial-progress text-primary md:m-0"
            :style="`--value:${user.Tasks.get(taskId).elapse * 100 / user.Tasks.get(taskId).duration}; --size:16rem; --thickness: 4px;`"
            role="progressbar">
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
import { format, parse } from 'date-fns';

const user = userStore();

const route = useRoute();
const router = useRouter();
const taskId = route.params.taskId;

const isPlaying = ref(false);


const task = user.Tasks.get(taskId);

if (task === undefined) {
  router.push('/');
}

const hours = ref(Math.floor((task.duration - task.elapse) / (60 * 60)));
const minutes = ref(Math.floor((task.duration - task.elapse) / 60) % 60);
const seconds = ref((task.duration - task.elapse) % 60);

let interval = null;

watch(isPlaying, v => {
  if (v) {
    interval = setInterval(() => {
      if (user.Tasks.get(taskId).elapse >= user.Tasks.get(taskId).duration) {
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

      user.Tasks.get(taskId).elapse += 1;
      saveTask();
      hours.value = Math.floor((user.Tasks.get(taskId).duration - user.Tasks.get(taskId).elapse) / (60 * 60));
      minutes.value = Math.floor((user.Tasks.get(taskId).duration - user.Tasks.get(taskId).elapse) / 60) % 60;
      seconds.value = (user.Tasks.get(taskId).duration - user.Tasks.get(taskId).elapse) % 60;

    }, 1000);
  } else {
    if (interval != null) {
      clearInterval(interval);
      saveTask();
    }
  }
})

onUnmounted(() => {
  if (interval != null) {
    clearInterval(interval);
  }
})



</script>