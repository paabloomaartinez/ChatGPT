<template>
    <div class="base-wireframe">
    <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
    </header>
    <main>
        <div class="pregunta-inicial-page">
        <h1>¿Has utilizado Vue.js alguna vez?</h1>
        <button @click="redirectToScreening">Si</button>
        <button @click="redirectToNoVue">No</button>
        </div>
    </main>
    <footer>
      <p>&copy; 2023 ChatGPT - Learning Vue</p>
    </footer>
  </div>
</template>
  
<script>
  import API from '../controllers/login';
  export default {
    methods: {
      redirectToScreening() {
        this.$router.push('/screening');
      },
      async redirectToNoVue() {
        let userData = localStorage.getItem('user')
        let user = JSON.parse(userData)
        console.log(user[0]._id)
        API.setLevelZero(user[0]._id)
        let newUser = await API.getUserById(user[0].username)
        localStorage.setItem('user', JSON.stringify(newUser))
        this.$router.push('/noVue');
      }
    }
  }
</script>

<style>
.titulo {
text-decoration: none;
color: white;
}

.titulo-link {
text-decoration: none;
color: white;
}

.base-wireframe {
display: flex;
flex-direction: column;
min-height: 100vh;
font-family: sans-serif;
}

header {
background-color: #333;
color: white;
padding: 1rem;
display: flex;
justify-content: space-between;
align-items: center;
}

main {
flex: 1;
padding: 1rem;
}

footer {
background-color: #333;
color: white;
padding: 1rem;
text-align: center;
}

.pregunta-inicial-page {
  display:block;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 515px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
}

button {
  margin-top: 10px;
  margin-right: 10px;
  padding: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>
  