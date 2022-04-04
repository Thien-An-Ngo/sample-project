<template>
  <div class="container">
    <input type="text" v-model="textinput" />
    <button @click="postRequest">POST</button>
    <button @click="getRequest">GET</button>

    <br />
    <hr />

    <table v-show="user.id">
      <thead>
        <th>ID</th>
        <th>Username</th>
        <th>Name</th>
        <th>Lastname</th>
        <th>Password</th>
      </thead>
      <tr>
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.surname }}</td>
        <td>{{ user.password }}</td>
      </tr>
    </table>

    <br />
    <br />
    <br />
    <br />

    User Raw JSON:
    {{ user }}
  </div>
</template>

<script>
import { defineComponent } from 'vue'

import axios from 'axios'

export default defineComponent({
  name: 'UserTable',
  data() {
    return {
      user: {},
      textinput: '',
      showTable: false,
    }
  },
  async created() {
    // console.log(await axios.get('/api'))
  },
  methods: {
    async postRequest() {
      console.log(this.textinput)
      this.user = await axios.post('/api/user/new/', {
        username: this.textinput,
        name: 'TestName',
        surname: 'TestSurName',
        password: '12345678',
      })
    },
    async getRequest() {
      this.user = (
        await axios.get(`/api/user/get?username=${this.textinput}`)
      ).data.user
      this.showTable = true
    },
  },
})
</script>

<style scoped></style>
