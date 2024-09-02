import { userStore } from "#imports";

export const initTask = () => {
  const user = userStore();
  if (user.isLogin) {
    $fetch('/api/users/fetch', {
      method: 'POST',
      body: JSON.stringify({
        email: user.Email,
      }),
    }).then((data) => {
      if (data.length === 0) {
        user.Tasks = new Map();
        user.TotalTime = new Map();
      } else {
        user.Tasks = new Map(Object.entries(data[0].tasks));
        user.TotalTime = new Map(Object.entries(data[0].total_time));
      }
    });
  } else {
    const tasks = localStorage.getItem('tasks');
    const totalTime = localStorage.getItem('totalTime');
    if (tasks) {
      user.Tasks = new Map(Object.entries(JSON.parse(tasks)));
    }
    if (totalTime) {
      user.TotalTime = new Map(Object.entries(JSON.parse(totalTime)));
    }
  }
}

export const saveTask = () => {
  const user = userStore();
  if (user.isLogin) {
    $fetch('/api/users/save', {
      method: 'POST',
      body: JSON.stringify({
        email: user.Email,
        tasks: Object.fromEntries(user.Tasks),
        totalTime: Object.fromEntries(user.TotalTime),
      }),
    });
  } else {
    localStorage.setItem('tasks', JSON.stringify(Object.fromEntries(user.Tasks)));
    localStorage.setItem('totalTime', JSON.stringify(Object.fromEntries(user.TotalTime)));
  }
};

export const deleteTask = (task: string) => {
  const user = userStore();
  user.Tasks.delete(task);
  saveTask();
}