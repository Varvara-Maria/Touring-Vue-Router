<template>
  <p>Register for the here</p>
  <button @click="register">Register Me</button>
</template>

<script>
export default {
  props: ['event'],
  methods: {
    register() {
      this.$router.push({
        name: 'EventDetails'
      })
    }
  }

}
</script>
