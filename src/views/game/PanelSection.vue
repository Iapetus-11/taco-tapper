<script setup lang="ts">
    import { onBeforeUnmount, onMounted, ref, watch } from 'vue';
    import { useTailwindBreakpoint } from '@/utils';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';

    defineProps<{
        title: string;
        description?: string;
    }>();

    const slideoutOpen = ref(false);
    const mobileView = useTailwindBreakpoint('max-lg');

    watch(mobileView, () => (slideoutOpen.value = false));

    function onWindowKeyDown(ev: KeyboardEvent) {
        if (ev.key === 'Escape') {
            slideoutOpen.value = false;
        }
    }

    onMounted(() => window.addEventListener('keydown', onWindowKeyDown));
    onBeforeUnmount(() => window.removeEventListener('keydown', onWindowKeyDown));
</script>

<style scoped>
    @keyframes fade-slideout-backdrop {
        0% {
            background-color: rgba(55, 65, 81, 0%);
        }

        100% {
            background-color: rgba(55, 65, 81, 50%);
        }
    }

    .fade-slideout-backdrop {
        animation: fade-slideout-backdrop ease-in-out 150ms;
        animation-fill-mode: forwards;
    }

    @keyframes slideout {
        0% {
            max-width: 0;
        }

        100% {
            max-width: 85%;
        }
    }

    .slideout {
        animation: slideout ease-in-out 150ms;
        animation-fill-mode: forwards;
    }
</style>

<template>
    <div>
        <div
            @click="slideoutOpen = true"
            :role="mobileView ? 'button' : 'none'"
            class="flex items-center p-4 max-lg:hover:bg-gray-700 max-lg:hover:bg-opacity-10"
        >
            <div class="flex flex-col w-full">
                <h2 class="text-xl text-white font-semibold">{{ title }}</h2>
                <p v-if="description" class="text-xs text-gray-50">{{ description }}</p>
            </div>

            <button type="button" class="p-1 lg:hidden">
                <FontAwesomeIcon :icon="faChevronRight" class="text-gray-200" />
            </button>
        </div>

        <!-- Desktop view content -->
        <div v-if="!mobileView">
            <slot />
        </div>

        <!-- Mobile view slideout backdrop -->
        <Transition
            enter-active-class="transition-all duration-150"
            enter-from-class="!opacity-0"
            enter-to-class="!opacity-50"
            leave-active-class="transition-all duration-150"
            leave-from-class="!opacity-50"
            leave-to-class="!opacity-0"
            mode="out-in"
        >
            <div
                v-if="mobileView && slideoutOpen"
                @click="slideoutOpen = false"
                class="absolute top-0 right-0 w-[100vw] h-[100vh] z-40 bg-gray-700 opacity-50"
            />
        </Transition>

        <!-- Mobile view slideout content -->
        <Transition
            enter-active-class="transition-all duration-150"
            enter-from-class="max-w-0"
            enter-to-class="max-w-[85vw]"
            leave-active-class="transition-all duration-150"
            leave-from-class="max-w-[85vw]"
            leave-to-class="max-w-0"
            mode="out-in"
        >
            <div
                v-if="mobileView && slideoutOpen"
                class="absolute top-0 right-0 h-[100vh] z-50 w-[85vw] bg-gradient-to-b from-purple-300 via-purple-600 to-violet-700 rounded-l-lg overflow-hidden"
            >
                <button
                    @click="slideoutOpen = false"
                    type="button"
                    class="absolute top-1/2 left-0 -translate-y-1/2 pl-1 pr-2 py-2 rounded-r-full bg-gray-300 opacity-75 shadow-sm"
                >
                    <FontAwesomeIcon :icon="faChevronRight" size="lg" class="text-gray-500" />
                </button>

                <div
                    class="w-full h-full overflow-y-scroll min-w-[85vw]"
                >
                    <slot />
                </div>
            </div>
        </Transition>
    </div>
</template>
