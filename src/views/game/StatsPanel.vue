<script setup lang="ts">
    import { type GameState } from '@/game';
    import PanelSection from '@/views/game/PanelSection.vue';
    import { computed, ref } from 'vue';
    import { useTailwindBreakpoint } from '@/utils';

    const props = defineProps<{
        state: GameState;
        clickMultiplier: number;
        varietyBonus: number;
    }>();

    const mobileView = useTailwindBreakpoint('max-lg');

    const openedForDetailStat = ref<string>();
    function openStatForDetail(stat: string) {
        if (openedForDetailStat.value === stat) {
            openedForDetailStat.value = undefined;
        } else {
            openedForDetailStat.value = stat;
        }
    }

    const statistics = computed<{ name: string; value: string | number; description: string }[]>(
        () => [
            {
                name: 'Total Clicks',
                value: props.state.clicks,
                description: 'The total number of clicks',
            },
            {
                name: 'Variety Bonus',
                value: `${props.varietyBonus.toFixed(2)}x`,
                description:
                    'An extra bonus to the click multiplier, increases as you unlock more types of toppings',
            },
            {
                name: 'Click Multiplier',
                value: `${props.clickMultiplier.toFixed(2)}x`,
                description: 'The number of additional tacos earned per click',
            },
        ],
    );
</script>

<template>
    <PanelSection title="Statistics">
        <div class="flex flex-col divide-y-2 divide-purple-300 divide-opacity-75">
            <div
                v-for="{ name, value, description } in statistics"
                :key="name"
                @click="openStatForDetail(name)"
                :role="mobileView ? 'none' : 'button'"
                class="flex flex-col justify-center bg-white bg-opacity-60 lg:hover:bg-opacity-50 py-1.5 px-2.5"
            >
                <span class="flex justify-between w-full text-sm">
                    <span class="text-gray-700">{{ name }}</span>
                    <code>{{ value }}</code>
                </span>

                <Transition
                    enter-active-class="transition-all ease-linear duration-200"
                    enter-from-class="max-h-[0]"
                    enter-to-class="max-h-[2rem]"
                    leave-active-class="transition-all ease-linear duration-100"
                    leave-from-class="max-h-[2rem]"
                    leave-to-class="max-h-[0]"
                    mode="out-in"
                >
                    <p
                        v-if="openedForDetailStat === name || mobileView"
                        class="h-full text-xs text-left text-gray-700"
                    >
                        {{ description }}
                    </p>
                </Transition>
            </div>
        </div>
    </PanelSection>
</template>
