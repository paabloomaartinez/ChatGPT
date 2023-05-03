<template>
  <div class="home-page">
    <h1>Welcome to the Vue Learning App</h1>
    <p>Here you will find exercises and tutorials to help you learn Vue.</p>
    <p>Our app includes:</p>
    <ul>
      <li>Interactive exercises to help you practice Vue concepts</li>
      <li>Tutorials and guides to explain Vue features and best practices</li>
      <li>A community forum where you can connect with other Vue learners</li>
    </ul>
    <p>As part of our commitment to providing the best learning experience possible, we are currently working on integrating ChatGPT with our exercise correction system. This will allow us to provide more personalized feedback to our users, based on their specific errors and mistakes.</p>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-size: 1.2rem;
}

ul {
  list-style: disc;
  margin-left: 2rem;
}

li {
  margin-bottom: 0.5rem;
}
</style>
