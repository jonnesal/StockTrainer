<template>
  <div class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext gap-3">

  Saako dataa {{ users }}

  </div>
</template>

<script setup>
useHead ({
    title: "Trainer | StockTrainer",
    meta: [
      { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})

const { data: users } = await useAsyncData('count', () => $fetch('http://localhost:3001/testi/users'))
  /*let users1 = await useFetch('http://localhost:3001/testi/users')

  const users = users1.data._value

console.log(users);

   */

console.log(users._value);
</script>

<style lang="scss" scoped>

</style>
