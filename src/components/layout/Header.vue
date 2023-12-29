<script setup lang="ts">
    const NAVIGATION = [
        {
            name: 'Play',
            route: 'game',
        },
        {
            name: 'About',
            route: 'about',
        },
    ];
</script>

<template>
    <div
        class="flex min-h-[84px] w-full items-center bg-violet-600 px-10 text-white shadow-md shadow-violet-500 max-sm:flex-col max-sm:pb-3 max-sm:pt-2 sm:min-h-[64px] sm:justify-between"
    >
        <div class="flex items-center max-sm:mb-1">
            <a href="/"><img src="/art/tacos/pixel.png" alt="Pixel Taco" class="mr-3 h-9" /></a>

            <h1 class="whitespace-nowrap text-3xl font-semibold leading-none">Taco Tapper</h1>
        </div>

        <nav>
            <ul class="flex space-x-4 font-semibold">
                <li v-for="{ route, name } in NAVIGATION" :key="route">
                    <RouterLink
                        :to="{ name: route }"
                        class="transition-all"
                        :class="[$route.name === route ? 'cursor-not-allowed' : 'opacity-80']"
                    >
                        {{ name }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
