<template>
    <div class="fixed top-0 left-0 h-screen w-1/12 m-0 flex flex-col bg-secondarybackground text-lighttext text-center text-3xl pt-10 gap-14">
        <NuxtLink to="/">
            <Icon name="material-symbols:waterfall-chart-rounded" size="3em"
            class="p-3 bg-buttonbackground hover:bg-hoverbackground rounded-[50%] hover:rounded-3xl transition-all duration-150 ease-linear cursor-pointer"/>
        </NuxtLink>
        <NuxtLink to="/trainer">
            <Icon name="mingcute:play-line" size="3em"
            class="p-3 bg-buttonbackground hover:bg-hoverbackground rounded-[50%] hover:rounded-3xl transition-all duration-150 ease-linear cursor-pointer"/>
        </NuxtLink>
        <NuxtLink to="/about" >
            <Icon name="material-symbols:question-mark-rounded" size="3em"
            class="p-3 bg-buttonbackground hover:bg-hoverbackground rounded-[50%] hover:rounded-3xl transition-all duration-150 ease-linear cursor-pointer"/>
        </NuxtLink>
    </div>
    <!-- page content comes here -->
    <div class="min-h-screen bg-primarybackground">
        <div class="font-mono ml-40 min-h-screen bg-primarybackground">
            <slot />
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
    .router-link-exact-active > svg {
        color: #B26CEF;
        border-width: 4px;
    }    
</style>