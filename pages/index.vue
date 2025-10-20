<template>
  <div class="container">
    <h1>Task Manager</h1>
    <p>You can get to the task list here:</p>
    
    <TmLink to="/tasks">
      View Tasks
    </TmLink>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}
</style>