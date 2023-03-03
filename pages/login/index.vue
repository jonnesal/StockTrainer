<template>
    <div class="grid grid-cols-2 min-h-screen items-center justify-items-center text-center text-lighttext">
        <div class="flex flex-col justify-center text-lighttext bg-secondarybackground ml-96 p-5">
            <p>Login</p>
            <br>
            <button @click="signIn('github')">Github</button>
            <br>
            <form class="flex flex-col">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" class="text-primarybackground" required>
                <label for="password">Password</label>
                <input type="text" id="password" v-model="password" class="text-primarybackground" required>
                <button @click="signIn('credentials', { username: username, password: password })">Login</button>
            </form>
        </div>
        <div class="flex flex-col justify-center text-lighttext bg-secondarybackground mr-96 p-5">
            <p>Register</p>
        </div>
    </div>
</template>

<script setup>
useHead ({
    title: "Login | StockTrainer",
    meta: [
      { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})

definePageMeta({ auth: false })

const { signIn } = useSession()
</script>

<style scoped>

</style>