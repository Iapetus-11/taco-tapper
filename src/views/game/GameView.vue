<script setup lang="ts">
    import { AUTO_CLICKERS, type GameState, SKINS, TOPPINGS } from '@/game';
    import {
        AutoClickersPanel,
        PanelSection,
        SkinsPanel,
        StatsPanel,
        ToppingsPanel,
    } from './panels';
    import { computed, ref } from 'vue';
    import { useInterval, usePersistedRef } from '@/utils';

    const state = usePersistedRef<GameState>('game:state', {
        clicks: 0,
        userClicks: 0,
        fractionClicks: 0,
        tacos: 0,
        totalTacos: 0,
        ownedToppings: {},
        ownedAutoClickers: {},
        ownedSkins: ['The Original'],
        selectedSkin: 'The Original',
    });

    const tacoAnimationState = ref(false);

    const autoClicksPerSecond = computed(() => {
        if (Object.keys(state.value.ownedAutoClickers).length <= 0) {
            return 0;
        }

        return Object.entries(state.value.ownedAutoClickers)
            .map(
                ([autoClickerName, c]) =>
                    AUTO_CLICKERS[autoClickerName as keyof typeof AUTO_CLICKERS].cps * c,
            )
            .reduce((sum, cur) => sum + cur);
    });
    useInterval(async () => {
        let wholeClicks = Math.floor(autoClicksPerSecond.value);
        state.value.fractionClicks += autoClicksPerSecond.value - wholeClicks;

        if (state.value.fractionClicks >= 1) {
            const flooredFractionClicks = Math.floor(state.value.fractionClicks);
            state.value.fractionClicks -= flooredFractionClicks;
            wholeClicks += flooredFractionClicks;
        }

        for (let i = 0; i < wholeClicks; i++) {
            click();
            await new Promise((resolve) => setTimeout(resolve, 990 / wholeClicks));
        }
    }, 1000);

    const varietyBonus = computed(() =>
        Math.pow(Object.values(state.value.ownedToppings).length / 5.0, 1.5),
    );
    const clickMultiplier = computed(() => {
        const toppingMultiplier = Object.entries(state.value.ownedToppings)
            .map(([u, c]) => {
                return TOPPINGS[u as keyof typeof TOPPINGS].multiplier * c;
            })
            .reduce((sum, value) => sum + value, 0);

        return toppingMultiplier + varietyBonus.value;
    });

    function click() {
        const earnedTacos = 1 + clickMultiplier.value;
        state.value.tacos += earnedTacos;
        state.value.totalTacos += earnedTacos;

        state.value.clicks += 1;

        tacoAnimationState.value = true;
        setTimeout(
            () => (tacoAnimationState.value = false),
            autoClicksPerSecond.value > 100 ? 10 : autoClicksPerSecond.value > 50 ? 25 : 100,
        );
    }

    function userClick() {
        click();
        state.value.userClicks += 1;
    }

    function debugYeetData() {
        window.localStorage.removeItem('game:state');
        window.location.reload();
    }
</script>

<style scoped>
    .panel-section-group {
        @apply w-full bg-gray-300 bg-opacity-40 lg:mt-1.5 lg:h-full lg:overflow-y-auto lg:pb-20;
        @apply divide-gray-200 max-lg:divide-y;
    }
</style>

<template>
    <div class="flex h-full flex-col place-items-center max-lg:flex-grow lg:grid lg:grid-cols-4">
        <div
            class="panel-section-group border-gray-200 max-lg:order-last max-lg:border-t lg:rounded-r-md"
        >
            <SkinsPanel v-model:state="state" />
            <StatsPanel
                :state="state"
                :click-multiplier="clickMultiplier"
                :variety-bonus="varietyBonus"
                :auto-clicks-per-second="autoClicksPerSecond"
            />
            <PanelSection title="Debug">
                <div class="flex flex-col space-y-4 bg-white bg-opacity-50">
                    <p>{{ tacoAnimationState }}</p>

                    <code class="whitespace-pre">
                        Game State: <span class="select-text">{{ state }}</span>
                    </code>
                </div>

                <div class="flex gap-2">
                    <button type="button" @click="debugYeetData()" class="w-full bg-red-500 p-1.5">
                        Yeet Data
                    </button>
                    <button
                        type="button"
                        @click="state.tacos += 1000"
                        class="w-full bg-green-500 p-1.5"
                    >
                        Add 1k
                    </button>
                </div>
            </PanelSection>
        </div>

        <div class="mt-10 flex flex-col max-lg:my-auto max-lg:pt-[7.5vw] lg:col-span-2 lg:-mt-32">
            <div
                class="mx-auto mb-4 font-mono text-4xl font-semibold text-gray-900 text-opacity-50 lg:mb-10"
            >
                {{ Math.floor(state.tacos).toLocaleString() }}
            </div>

            <button
                @click="userClick"
                type="button"
                class="rounded-full px-5 pb-7"
                :class="tacoAnimationState ? 'scale-[97%]' : 'scale-100'"
            >
                <span
                    class="flex h-full max-h-[325px] w-full max-w-[448px] items-center justify-center"
                >
                    <img
                        :src="SKINS[state.selectedSkin].icon"
                        :alt="`${state.selectedSkin} Taco`"
                        draggable="false"
                        class="max-h-[325px] max-w-[70%] md:max-w-[448px]"
                    />
                </span>
            </button>
        </div>

        <div class="panel-section-group mt-auto lg:rounded-l-md">
            <ToppingsPanel v-model:state="state" />
            <AutoClickersPanel v-model:state="state" />
        </div>
    </div>
</template>
