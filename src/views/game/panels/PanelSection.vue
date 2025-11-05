<script setup lang="ts">
    import { onBeforeMount, onUnmounted, ref, watch } from 'vue';
    import { faChevronRight } from '@fortawesome/pro-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { useTailwindBreakpoint } from '@/utils';

    defineProps<{
        title: string;
        description?: string;
    }>();

    const mobileTrayOpen = ref(false);
    const mobileView = useTailwindBreakpoint('max-lg');

    watch(mobileView, () => (mobileTrayOpen.value = false));

    watch(
        () => mobileView.value && mobileTrayOpen.value,
        async (open) => {
            const appContainer = document.getElementById('app')!;

            if (open) {
                appContainer.classList.add('!overflow-hidden');
                appContainer.classList.add('!min-h-[100vh]');
            } else {
                appContainer.classList.remove('!overflow-hidden');
                appContainer.classList.remove('!h-[100vh]');
            }
        },
    );

    function onWindowKeyPress(ev: KeyboardEvent) {
        if (ev.key === 'Escape') {
            mobileTrayOpen.value = false;
        }
    }

    onBeforeMount(() => {
        window.addEventListener('keydown', onWindowKeyPress);
    });

    onUnmounted(() => {
        window.removeEventListener('keydown', onWindowKeyPress);
    });
</script>

<template>
    <div>
        <div
            @click="mobileTrayOpen = true"
            :role="mobileView ? 'button' : 'none'"
            class="flex items-center p-4 max-lg:hover:bg-gray-700/10"
        >
            <div class="flex w-full flex-col">
                <h2 class="text-xl font-semibold text-white">{{ title }}</h2>
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

        <!-- Mobile view tray backdrop -->
        <Transition
            enter-active-class="transition-all duration-150"
            enter-from-class="opacity-0!"
            enter-to-class="opacity-50!"
            leave-active-class="transition-all duration-150"
            leave-from-class="opacity-50!"
            leave-to-class="opacity-0!"
            mode="out-in"
        >
            <div
                v-if="mobileView && mobileTrayOpen"
                @click="mobileTrayOpen = false"
                class="fixed top-0 right-0 z-40 h-screen w-screen bg-gray-700 opacity-50"
            />
        </Transition>

        <!-- Mobile view tray content -->
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
                v-if="mobileView && mobileTrayOpen"
                class="fixed top-0 right-0 z-50 h-screen w-[85vw] overflow-hidden rounded-l-lg bg-linear-to-b from-purple-300 via-purple-600 to-violet-700"
            >
                <button
                    @click="mobileTrayOpen = false"
                    type="button"
                    class="absolute top-1/2 left-0 -translate-y-1/2 rounded-r-full bg-gray-300 py-2 pr-2 pl-1 opacity-75 shadow-sm"
                >
                    <FontAwesomeIcon :icon="faChevronRight" size="lg" class="text-gray-500" />
                </button>

                <div class="h-full w-full min-w-[85vw] overflow-y-auto pb-24">
                    <slot />
                </div>
            </div>
        </Transition>
    </div>
</template>
