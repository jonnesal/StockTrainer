<template>
    <div class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext gap-3">
        <h1 class="text-6xl">// This is the homepage for StockTrainer //</h1>
        <h2 class="text-3xl">Learn to manage, buy and sell stocks without risk!</h2>
        <button v-if="status === 'authenticated'" class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-lg" @click="signOut({ callbackUrl: '/' })">
        <span>Logout</span>
        </button>
        <button v-else class="flex items-center justify-center space-x-2 bg-green-500 text-white rounded-lg py-2 px-3 text-lg" @click="signIn()">
        <span>Login</span>
        </button>
        <h1 v-if="status === 'authenticated'" class="text-lg">Authenticated</h1>
        <h1 v-else>Not logged in</h1>
    </div>
</template>

<script setup>
useHead ({
    title: "Home | StockTrainer",
    meta: [
      { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})

const { status, signOut, signIn } = useSession()
</script>

<style scoped>

</style>