<script setup lang="ts">
    import { useInterval, usePersistedRef } from '@/utils';
    import { AUTO_CLICKERS, type GameState, SKINS, TOPPINGS } from '@/game';
    import { computed, ref } from 'vue';
    import { AutoClickersPanel, PanelSection, SkinsPanel, StatsPanel, ToppingsPanel } from './panels';

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
            autoClicksPerSecond.value > 100 ? 10 : 100,
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
        @apply w-full lg:h-full bg-gray-300 bg-opacity-40 lg:overflow-y-auto lg:pb-20 lg:mt-1.5;
        @apply max-lg:divide-y divide-gray-200;
    }
</style>

<template>
    <div
        class="flex flex-col lg:grid lg:grid-cols-4 place-items-center h-full max-lg:overflow-y-auto"
    >
        <div
            class="panel-section-group lg:rounded-r-md max-lg:order-last max-lg:border-t border-gray-200"
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
                    <button type="button" @click="debugYeetData()" class="p-1.5 w-full bg-red-500">
                        Yeet Data
                    </button>
                    <button
                        type="button"
                        @click="state.tacos += 1000"
                        class="p-1.5 w-full bg-green-500"
                    >
                        Add 1k
                    </button>
                </div>
            </PanelSection>
        </div>

        <div class="lg:col-span-2 flex flex-col mt-10 lg:-mt-32 max-lg:my-auto max-lg:pt-[7.5vw]">
            <div
                class="mx-auto text-4xl mb-4 lg:mb-10 font-mono text-gray-900 text-opacity-50 font-semibold"
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
                    class="flex justify-center items-center max-w-[448px] max-h-[325px] w-full h-full"
                >
                    <img
                        :src="SKINS[state.selectedSkin].icon"
                        :alt="`${state.selectedSkin} Taco`"
                        draggable="false"
                        class="max-w-[70%] md:max-w-[448px] max-h-[325px]"
                    />
                </span>
            </button>
        </div>

        <div class="panel-section-group lg:rounded-l-md">
            <ToppingsPanel v-model:state="state" />
            <AutoClickersPanel v-model:state="state" />
        </div>
    </div>
</template>
