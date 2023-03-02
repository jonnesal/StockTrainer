<template>
    <div class="flex justify-center min-h-screen items-center text-center">
        <form>
            <h1 class="text-lighttext">Login</h1>
            <div class="text-buttonbackground">
                <div>
                    <input type="username" placeholder="Username" autocomplete="nope">
                </div>
                <div>
                    <input type="password" placeholder="Password" autocomplete="new-password">
                </div>
            </div>
            <div class="grid grid-cols-2 text-lighttext">
                <button>Login</button>
                <button>Register</button>
            </div>
        </form>
    </div>
</template>

<script setup>
useHead ({
    title: "Login | StockTrainer",
    meta: [
      { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})
</script>

<style lang="scss" scoped>

</style>