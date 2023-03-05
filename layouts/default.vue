<template>
    <div class="font-mono fixed top-0 left-0 h-screen w-36 m-0 flex flex-col bg-secondarybackground text-lighttext text-center text-3xl pt-10 gap-14">
        <NuxtLink to="/">
            <span class="group">
                <Icon name="material-symbols:waterfall-chart-rounded" size="3em"
                class="p-3 bg-buttonbackground hover:bg-hoverbackground rounded-[50%] hover:rounded-3xl transition-all duration-150 ease-linear cursor-pointer"/>
                <p class="absolute left-[10.6rem] top-16 p-1 pl-3 pr-3 bg-buttonbackground rounded-xl scale-0 group-hover:scale-100 duration-75 select-none">Home</p>
            </span>
        </NuxtLink>
        <NuxtLink to="/login">
            <span class="group">
                <Icon name="material-symbols:login-rounded" size="3em"
                class="p-3 bg-buttonbackground hover:bg-hoverbackground rounded-[50%] hover:rounded-3xl transition-all duration-150 ease-linear cursor-pointer"/>
                <p class="absolute left-[10.6rem] top-52 p-1 pl-3 pr-3 bg-buttonbackground rounded-xl scale-0 group-hover:scale-100 duration-75 select-none">Login</p>
            </span>
        </NuxtLink>
        <NuxtLink to="/trainer">
            <span class="group">
                <Icon name="mingcute:play-line" size="3em"
                class="p-3 bg-buttonbackground hover:bg-hoverbackground rounded-[50%] hover:rounded-3xl transition-all duration-150 ease-linear cursor-pointer"/>
                <p class="absolute left-[10.6rem] top-[22rem] p-1 pl-3 pr-3 bg-buttonbackground rounded-xl scale-0 group-hover:scale-100 duration-75 select-none">Trainer</p>
            </span>
        </NuxtLink>
        <NuxtLink to="/about" >
            <span class="group">
                <Icon name="material-symbols:question-mark-rounded" size="3em"
                class="p-3 bg-buttonbackground hover:bg-hoverbackground rounded-[50%] hover:rounded-3xl transition-all duration-150 ease-linear cursor-pointer"/>
                <p class="absolute left-[10.6rem] top-[31.5rem] p-1 pl-3 pr-3 bg-buttonbackground rounded-xl scale-0 group-hover:scale-100 duration-75 select-none">About</p>
            </span>
        </NuxtLink>
    </div>
    <!-- page content comes here -->
    <div class="min-h-screen bg-primarybackground">
        <div class="font-mono ml-36 min-h-screen bg-primarybackground">
            <slot />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .router-link-exact-active > span > svg {
        color: #B26CEF;
        border-width: 4px;
    }    
</style>