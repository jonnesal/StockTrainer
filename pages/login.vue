<template>
    <div class="grid grid-cols-3 min-h-screen items-center justify-items-center text-center text-lighttext text-3xl select-none">
        <div class="flex flex-col justify-center text-lighttext bg-secondarybackground ml-96 p-5 rounded-3xl">
            <p><u>Login</u></p>
            <br>
            <button @click="signIn('github')">
              <span class="border-lighttext border-2 p-2 rounded-xl bg-primarybackground hover:bg-buttonbackground transition-all duration-150">
                	<Icon name="mingcute:github-line" class="mb-1"></Icon> Use GitHub
              </span>
            </button>
            <p class="mt-4 p-3 text-2xl">———————— or ————————</p>
            <form class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input type="text" v-model="loginUsername" spellcheck="false" class="bg-primarybackground w-80 h-9 rounded-xl text-center" required>
                <label for="password">Password</label>
                <div>
                    <input :type="loginFieldType" v-model="loginPassword" spellcheck="false" autocomplete="off"
                    class="bg-primarybackground w-80 h-9 rounded-xl text-center pr-12" required>
                    <span @click="toggleLoginPassword" class="absolute -ml-10">
                      	<Icon :name="`${loginEyeIcon}`"></Icon>
                    </span>
                </div>
                <br>
                <button @click="signIn('credentials', { username: loginUsername, password: loginPassword })">
                  	<span class="border-lighttext border-2 p-2 rounded-xl bg-primarybackground hover:bg-buttonbackground transition-colors duration-150">Login</span>
                </button>
            </form>
        </div>
        <div>
			<button v-if="status === 'authenticated'" class="flex items-center justify-center space-x-2 bg-red-500 text-white rounded-lg py-2 px-3 text-lg" @click="signOut({ callbackUrl: '/' })">
			<span>Logout</span>
			</button>
			<button v-else class="flex items-center justify-center space-x-2 bg-green-500 text-white rounded-lg py-2 px-3 text-lg" @click="signIn()">
			<span>Login</span>
			</button>
			<h1 v-if="status === 'authenticated'" class="text-lg">Authenticated</h1>
			<h1 v-else>Not logged in</h1>
        </div>
        <div class="flex flex-col justify-center text-lighttext bg-secondarybackground mr-96 p-5 rounded-3xl">
            <p><u>Register</u></p>
            <br>
            <form class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input type="text" v-model="registerUsername" spellcheck="false" class="bg-primarybackground w-80 h-9 rounded-xl text-center" required>
                <label for="password">Password</label>
                <div>
                    <input :type="registerFieldType" v-model="registerPassword" spellcheck="false" autocomplete="off"
                    class="bg-primarybackground w-80 h-9 rounded-xl text-center pr-12" required>
                    <span @click="toggleRegisterPassword" class="absolute -ml-10">
                      	<Icon :name="`${registerEyeIcon}`"></Icon>
                    </span>
                </div>
                <br>
                <button @click="signIn('credentials', { username: registerUsername, password: registerPassword })">
                  	<span class="border-lighttext border-2 p-2 rounded-xl bg-primarybackground hover:bg-buttonbackground transition-colors duration-150">Register</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup>
definePageMeta ({
    title: "Login | StockTrainer",
    meta: [
      	{ name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
    ],
})

const { status, signOut, signIn } = useSession()
</script>

<script>
export default {
  	data() {
		return {
			registerUsername: "",
			registerPassword: "",
			loginUsername: "",
			loginPassword: "",
			loginEyeIcon: "mingcute:eye-2-fill",
			registerEyeIcon: "mingcute:eye-2-fill",
			loginFieldType: "password",
			registerFieldType: "password"
		};
  	},
  	methods: {
		toggleLoginPassword() {
			this.loginEyeIcon = this.loginEyeIcon == "mingcute:eye-2-fill" ? "mingcute:eye-close-line" : "mingcute:eye-2-fill";
			this.loginFieldType = this.loginFieldType == "text" ? "password" : "text";
		},
		toggleRegisterPassword() {
			this.registerEyeIcon = this.registerEyeIcon == "mingcute:eye-2-fill" ? "mingcute:eye-close-line" : "mingcute:eye-2-fill";
			this.registerFieldType = this.registerFieldType == "text" ? "password" : "text";
		},
  	},
};
</script>

<style scoped>

</style>