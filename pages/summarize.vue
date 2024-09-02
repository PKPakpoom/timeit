<template>
  <div class="flex flex-col gap-6 justify-center items-center p-4">
    <h1 class="text-4xl font-bold">Summarize</h1>
    <div class="bg-base-100 w-3/4 h-3/4 justify-center items-center">
      <Bar
        :data="data"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from '#imports';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { computed } from 'vue';
import { format, subDays, parse, compareAsc } from 'date-fns';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const user = userStore();

// console.log("TotalTime Map:", [...user.TotalTime.entries()]);

const last7Days = computed(() => {
  const today = new Date();
  const sevenDaysAgo = subDays(today, 7);
  
  return [...user.TotalTime.entries()]
    .filter(([dateStr, _]) => {
      const date = parse(dateStr, 'dd/MM/yyyy', new Date());
      return date >= sevenDaysAgo && date <= today;
    })
    .sort(([dateA], [dateB]) => {
      const parsedDateA = parse(dateA, 'dd/MM/yyyy', new Date());
      const parsedDateB = parse(dateB, 'dd/MM/yyyy', new Date());
      return compareAsc(parsedDateA, parsedDateB);
    });
});

// console.log("Last 7 Days Data:", last7Days.value);

const data = computed(() => ({
  labels: last7Days.value.map(([dateStr, _]) => dateStr),
  datasets: [
    {
      label: 'Total Hours',
      backgroundColor: '#a2e665',
      data: last7Days.value.map(([_, seconds]) => seconds / 3600),
    },
  ],
}));

// console.log("Chart Data:", data.value);

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

</script>
