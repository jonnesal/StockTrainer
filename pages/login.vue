<template>
    <div v-if="status === 'authenticated'" class="flex flex-col justify-center min-h-screen items-center text-center text-lighttext gap-3">
        <p class="text-6xl">Successfully logged in!</p>
    </div>
    <div v-else class="grid grid-cols-2 min-h-screen items-center justify-items-center text-center text-lighttext text-3xl select-none">
        <div class="flex flex-col justify-center text-lighttext bg-secondarybackground ml-96 p-5 rounded-3xl">
            <p><u>Login</u></p>
            <br>
            <form class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input type="text" v-model="loginUsername" spellcheck="false" class="bg-primarybackground w-80 h-9 rounded-xl text-center" required>
                <label for="password">Password</label>
                <div>
                    <input :type="loginFieldType" v-model="loginPassword" spellcheck="false" autocomplete="off"
                    class="bg-primarybackground w-80 h-9 rounded-xl text-center pr-12" required>
                    <span @click="toggleLoginPassword" class="absolute -ml-10 cursor-pointer">
                      	<Icon :name="`${loginEyeIcon}`"></Icon>
                    </span>
                </div>
                <br>
                <button @click="signIn('credentials', { username: loginUsername, password: loginPassword })">
                  	<span class="border-lighttext border-2 p-2 rounded-xl bg-primarybackground hover:bg-buttonbackground transition-colors duration-150">Login</span>
                </button>
            </form>
        </div>
        <div class="flex flex-col justify-center text-lighttext bg-secondarybackground mr-96 p-5 rounded-3xl">
            <p><u>Register</u></p>
            <br>
            <form @submit="registerNewUser" class="flex flex-col gap-2">
                <label for="username">Username</label>
                <input type="text" v-model="registerUsername" spellcheck="false" class="bg-primarybackground w-80 h-9 rounded-xl text-center" required>
                <label for="password">Password</label>
                <div>
                    <input :type="registerFieldType" v-model="registerPassword" spellcheck="false" autocomplete="off"
                    class="bg-primarybackground w-80 h-9 rounded-xl text-center pr-12" required>
                    <span @click="toggleRegisterPassword" class="absolute -ml-10 cursor-pointer">
                      	<Icon :name="`${registerEyeIcon}`"></Icon>
                    </span>
                </div>
                <br>
                <button type="submit" value="registerNewUser">
                  	<span class="border-lighttext border-2 p-2 rounded-xl bg-primarybackground hover:bg-buttonbackground transition-colors duration-150">Register</span>
                </button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">

    useHead({
        title: "Login | StockTrainer",
        meta: [
            { name: 'description', content: "Learn to manage, buy and sell stocks without risk!" }
        ],
    })

    const { status, signIn } = useSession()

    let registerUsername = ref("")
    let registerPassword = ref("")

    const router = useRouter();

    const registerNewUser = async () => {
        try {
            const body = {
                username: registerUsername.value,
                password: registerPassword.value,
            }
            await fetch(`/user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            })
            .then(()=>{
                router.push({ path: '/' })
            })
            .catch((error)=>{
                console.error(error);
            })
        } catch (error) {
            console.error(error)
        }
    }

    const loginUsername = ref("")
    const loginPassword = ref("")
    const loginEyeIcon = ref("mingcute:eye-2-fill")
    const registerEyeIcon = ref("mingcute:eye-2-fill")
    const loginFieldType = ref("password")
    const registerFieldType = ref("password")

    function toggleLoginPassword() {
        loginEyeIcon.value = loginEyeIcon.value == "mingcute:eye-2-fill" ? "mingcute:eye-close-line" : "mingcute:eye-2-fill"
        loginFieldType.value = loginFieldType.value == "text" ? "password" : "text"
    }

    function toggleRegisterPassword() {
        registerEyeIcon.value = registerEyeIcon.value == "mingcute:eye-2-fill" ? "mingcute:eye-close-line" : "mingcute:eye-2-fill"
        registerFieldType.value = registerFieldType.value == "text" ? "password" : "text"
    }
    
</script>

<style scoped>

</style>