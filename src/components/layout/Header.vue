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
        class="flex max-sm:flex-col max-sm:pt-2 max-sm:pb-3 sm:justify-between items-center px-10 w-full min-h-[84px] sm:min-h-[64px] bg-violet-600 shadow-md shadow-violet-500 text-white"
    >
        <div class="flex items-center max-sm:mb-1">
            <img src="/art/tacos/pixel.png" alt="Pixel Taco" class="h-9 mr-3" />

            <h1 class="font-semibold text-3xl leading-none whitespace-nowrap">Taco Tapper</h1>
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
