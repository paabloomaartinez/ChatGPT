<template>
    <div class="base-wireframe">
    <header>
        <h1 class="titulo"><router-link to="/" class="titulo-link">ChatGPT - Learning Vue</router-link></h1>
    </header>
    <main>
        <div class="pregunta-inicial-page">
          <h1 class="utilizado-title">¿Has utilizado Vue.js alguna vez?</h1>
          <div class="si-no-buttons">
            <button @click="redirectToScreening">Si</button>
            <button @click="redirectToNoVue">No</button>
          </div>
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
        await API.setLevel(user[0].username, {'level': 'Principiante', 
        'content':[
        { numero: 1, nombre: 'Fundamentos', enable: true},
        { numero: 2, nombre: 'Directivas', enable: false },
        { numero: 3, nombre: 'Metodos', enable: false },
        { numero: 4, nombre: 'Eventos', enable: false },
        { numero: 5, nombre: 'Componentes', enable: false },
        { numero: 6, nombre: 'Plantillas', enable: false },
        { numero: 7, nombre: 'Routing', enable: false },
        { numero: 8, nombre: 'Watchers', enable: false },
        { numero: 9, nombre: 'Animation', enable: false },
        { numero: 10, nombre: 'Build', enable: false },
        { numero: 11, nombre: 'Deployment', enable: false }
      ]})
        let newUser = await API.getUserById(user[0].username)
        localStorage.setItem('user', JSON.stringify(newUser))
        this.$router.push('/login/ok');
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
  background: linear-gradient(to bottom right, #afe4cc, #cbe9db);
}

header {
  background-color: #2e373f !important;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

footer {
  background-color: #2e373f !important;
}

main {
  flex: 1;
  padding: 1rem;
}

.pregunta-inicial-page {
  display:block;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 515px;
  margin: 0 auto;
  background-color: #d7faee9a;
  border: 1px solid #ffffff;
  border-radius: 16px;
  box-shadow: 0 7px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  animation: dropdown 1s ease-out;
}

@keyframes dropdown {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
}

button {
  width: 300px;
  margin-top: 10px;
  margin-right: 10px;
  padding: 0.5rem;
  background-color: #2e373f;
  font-size: 1rem;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.utilizado-title {
  color: #2e373f;
  font-size: 2.5rem;
  text-align: center;
}

.si-no-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  