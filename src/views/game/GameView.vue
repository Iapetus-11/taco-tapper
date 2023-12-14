<script setup lang="ts">
    import { usePersistedRef } from '@/utils';
    import { type GameState, SKINS, TOPPINGS } from '@/game';
    import { computed, ref } from 'vue';
    import PanelSection from '@/views/game/PanelSection.vue';
    import SkinsPanel from '@/views/game/SkinsPanel.vue';
    import ToppingsPanel from '@/views/game/ToppingsPanel.vue';
    import StatsPanel from '@/views/game/StatsPanel.vue';

    const state = usePersistedRef<GameState>('game:state', {
        clicks: 0,
        tacos: 0,
        totalTacos: 0,
        ownedToppings: {},
        ownedSkins: ['The Original'],
        selectedSkin: 'The Original',
    });

    const tacoAnimationState = ref(false);

    const perClickBonus = computed(() =>
        Object.entries(state.value.ownedToppings)
            .map(([u, c]) => {
                return TOPPINGS[u as keyof typeof TOPPINGS].multiplier * c;
            })
            .reduce((sum, value) => sum + value, 0),
    );

    function userClick() {
        const earnedTacos = 1 + perClickBonus.value;
        state.value.tacos += earnedTacos;
        state.value.totalTacos += earnedTacos;

        state.value.clicks += 1;

        tacoAnimationState.value = true;
        setTimeout(() => (tacoAnimationState.value = false), 100);
    }

    function debugYeetData() {
        window.localStorage.removeItem('game:state');
        window.location.reload();
    }
</script>

<template>
    <div class="grid lg:grid-cols-4 place-items-center h-full max-lg:overflow-y-auto">
        <div
            class="w-full h-full bg-gray-300 bg-opacity-40 lg:overflow-y-auto lg:pb-20 mt-1.5 lg:rounded-r-md max-lg:order-last"
        >
            <SkinsPanel v-model:state="state" />
            <StatsPanel :state="state" :per-click-bonus="perClickBonus" />
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

        <div class="lg:col-span-2 flex flex-col mt-10 lg:-mt-32">
            <div
                class="mx-auto text-4xl mb-10 font-mono text-gray-900 text-opacity-50 font-semibold"
            >
                {{ Math.floor(state.tacos).toLocaleString() }}
            </div>

            <button
                @click="userClick"
                type="button"
                class="rounded-full px-5 pb-7 md:pl-16 md:pb-14 md:pr-5 md:pt-5"
                :class="tacoAnimationState ? 'scale-[97%]' : 'scale-100'"
            >
                <span class="max-w-[448px] max-h-[325px] w-full h-full">
                    <img
                        :src="SKINS[state.selectedSkin].icon"
                        :alt="`${state.selectedSkin} Taco`"
                        draggable="false"
                        class="max-w-full md:max-w-[448px] max-h-[325px]"
                    />
                </span>
            </button>
        </div>

        <div
            class="w-full h-full bg-gray-300 bg-opacity-40 lg:overflow-y-auto lg:pb-20 mt-1.5 lg:rounded-l-md"
        >
            <ToppingsPanel v-model:state="state" />
        </div>
    </div>
</template>
