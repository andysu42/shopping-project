<template>
  <div class="login_container h-full flex flex-col">
    <div class="flex flex-col" style="height: 30%"></div>
    <div class="flex flex-col justify-center items-center align-center">
      <div class="flex flex-row">
        <div class="flex flex-col"></div>
        <div
          class="flex flex-col py-20 px-10 rounded-lg shadow-lg bg-blue-300"
          style="height: 350px"
        >
          <div class="flex flex-row justify-center mb-6">
            <div class="flex items-center mx-4" style="width: 100px">
              <label for="" class="text-xl">Username</label>
            </div>
            <div class="flex items-center">
              <input
                class="py-2 border border-transparent rounded-lg hover:bg-grey-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="username"
                type="text"
                placeholder="username"
                v-model="user.username"
              />
            </div>
          </div>
          <div class="flex flex-row justify-center mb-6">
            <div class="flex items-center mx-4" style="width: 100px">
              <label for="" class="text-xl">Password</label>
            </div>
            <div class="flex items-center">
              <input
                class="py-2 border border-transparent rounded-lg hover:bg-grey-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="password"
                type="text"
                placeholder="password"
                v-model="user.password"
              />
            </div>
          </div>
          <div class="flex flex-row justify-center">
            <button
              class="rounded-lg py-2 px-4 bg-blue-800 hover:bg-blue-900 text-white"
              style="width: 50%"
              @click="signIn"
            >
              Login
            </button>
          </div>
        </div>
        <div class="flex flex-col"></div>
      </div>
    </div>
    <div class="flex flex-col" style="height: 40%"></div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      show: {
        sh: true
      }
    }
  },
  mounted () {
    this.$set(this.show, 'sh', false)
  },
  methods: {
    async signIn () {
      this.$store.dispatch('doSetToken', this.user)
    }
  }
}
</script>
<style lang="scss" scoped></style>
