<template>
  <div class="container">
    <h1>Task Manager</h1>
    <p>Добро пожаловать в систему управления задачами</p>
    
    <div class="navigation">
      <TmLink to="/tasks">
        Просмотреть задачи
      </TmLink>
      <TmLink to="/task/1">
        Пример задачи
      </TmLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.navigation {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}
</style>