<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useTailwindBreakpoint } from '@/utils';

    defineProps<{
        title: string;
        description?: string;
    }>();

    const openTray = ref(false);
    const mobileView = useTailwindBreakpoint('max-lg');

    watch(mobileView, () => (openTray.value = false));
</script>

<template>
    <div>
        <div class="p-4">
            <h1 class="text-xl text-white font-semibold">{{ title }}</h1>
            <p v-if="description" class="text-xs text-gray-50">{{ description }}</p>
        </div>

        <div v-if="!mobileView">
            <slot />
        </div>
        <div v-else-if="openTray">
            <slot />
        </div>
    </div>
</template>
