# TimeIt
#### Video Demo:  [https://youtu.be/c2N1uK1Wxms](https://youtu.be/c2N1uK1Wxms)
#### Description:
> Timeit is a web application designed to help users track and manage time spent on various tasks. Built using Nuxt 3, the app is simple yet powerful, allowing users to create task-specific timers, visualize their time usage over the past week through a bar chart, and toggle between light and dark modes for a customizable experience. To ensure user data is stored securely, Timeit integrates Google OAuth for authentication, with all data being saved via Supabase.

## Key Features

### Task Timer
Timeit allows users to create custom-named timers for any task they are working on. You can track time for activities like studying, working, or exercising, and the timer continues running even if you navigate away from the site. This feature is designed to be flexible and simple so that users can stay focused on their tasks without needing to worry about manually tracking their time.

### Bar Chart Visualization
One of the standout features of Timeit is the bar chart, which visualizes the time you’ve spent on tasks over the past 7 days. The chart displays the total time spent on tasks for each day, with each bar representing the hours logged for that day. This gives users an at-a-glance overview of their time management for the past week. The focus on the most recent 7 days helps users reflect on their short-term habits and make adjustments if needed.

### Light/Dark Mode
Timeit offers a light/dark mode toggle, allowing users to switch between a bright interface and a darker, more subdued version, depending on their preferences or the lighting environment. The app uses DaisyUI for styling, which provides a clean and modern design. DaisyUI made it easy to implement a theme toggle with built-in support for both light and dark modes. The toggle is conveniently placed in the navigation bar, and the user’s chosen theme persists across sessions.

### Google OAuth & Supabase Integration
Timeit integrates Google OAuth to allow users to log in with their Google accounts. This ensures that user data is securely saved and can be accessed across different devices. Once logged in, users' task and time data are stored using Supabase, a powerful backend-as-a-service platform that provides real-time database features. This integration allows for seamless data storage and retrieval, ensuring that user progress is never lost.

## Tools

### Nuxt 3 for Performance and Flexibility
Choosing Nuxt 3 was a deliberate decision to ensure the app is fast and responsive. Nuxt 3 provides a modern development experience with features like server-side rendering (SSR) and static site generation (SSG). These features help with faster load times, improving the overall user experience. Since Timeit needs to track tasks and load data dynamically for each user, Nuxt 3’s flexibility in handling both SSR and SSG makes it a great fit.

### DaisyUI for User Interface
For the app’s user interface, DaisyUI was chosen for its clean and responsive components. DaisyUI’s utility-based approach allowed for a quick setup of the light/dark mode switch and provided a consistent look and feel across the app. Its pre-designed components also made it easy to maintain the aesthetic simplicity that was key to Timeit’s design, while also offering enough customization for an engaging experience.

### Supabase
Incorporating Supabase ensures that user data is stored securely and in real-time. Supabase was chosen because of its ease of integration with Nuxt 3 and its robust backend services, which include authentication, database, and real-time APIs. It allows Timeit to store user task data, time logs, and settings without having to worry about server infrastructure, making it both efficient and scalable.

### Deployment
Timeit is deployed on Vercel, taking advantage of Vercel’s optimized infrastructure for Nuxt 3 apps. The domain for the live application is [https://timeit.pakpoom.lol](https://timeit.pakpoom.lol). Vercel’s seamless integration with Nuxt 3 and its global content delivery network (CDN) ensure fast load times and a smooth experience for users no matter where they are located.
