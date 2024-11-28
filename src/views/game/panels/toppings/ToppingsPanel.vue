<script setup lang="ts">
    import { type GameState, type ToppingDefinition, TOPPINGS } from '@/game';
    import NotEnoughTacosForToppingModal from './NotEnoughTacosForToppingModal.vue';
    import PanelSection from '@/views/game/panels/PanelSection.vue';
    import { ref } from 'vue';

    const state = defineModel<GameState>('state', { required: true });

    const showNotEnoughTacosModal = ref<keyof typeof TOPPINGS>();

    function buyTopping(toppingName: keyof typeof TOPPINGS) {
        const topping = TOPPINGS[toppingName];

        if (topping.price > state.value.tacos) {
            showNotEnoughTacosModal.value = toppingName;
            return;
        }

        state.value.ownedToppings[toppingName] = (state.value.ownedToppings[toppingName] ?? 0) + 1;
        state.value.tacos -= topping.price;
    }
</script>

<template>
    <PanelSection
        title="Toppings"
        description="Increase the number of tacos earned per click by the multiplier. Maintain a variety of toppings to earn a slight bonus."
    >
        <div class="flex flex-col divide-y-2 divide-purple-300 divide-opacity-75">
            <button
                v-for="[toppingName, toppingProps] in Object.entries(TOPPINGS) as [
                    keyof typeof TOPPINGS,
                    ToppingDefinition,
                ][]"
                :key="toppingName"
                @click="() => buyTopping(toppingName)"
                type="button"
                class="flex items-center space-x-1.5 bg-white bg-opacity-60 p-1 hover:bg-opacity-50"
            >
                <span class="flex min-h-[76px] min-w-[76px] items-center justify-center">
                    <img
                        :src="toppingProps.icon"
                        :alt="toppingName"
                        class="h-full max-h-[76px] max-w-[76px] p-2"
                    />
                </span>

                <span class="flex flex-col text-left">
                    <span class="text-sm font-semibold text-gray-600">
                        {{ toppingName }}

                        <span v-if="state.ownedToppings[toppingName]" class="text-xs font-light">
                            [{{ state.ownedToppings[toppingName] }}]
                        </span>
                    </span>
                    <span class="text-xs text-gray-500">
                        Increases tacos per click by
                        <strong>{{ toppingProps.multiplier }}x</strong>, costs
                        <strong>{{ toppingProps.price }}</strong> tacos
                    </span>
                </span>
            </button>
        </div>
    </PanelSection>

    <NotEnoughTacosForToppingModal
        v-if="showNotEnoughTacosModal"
        @close="showNotEnoughTacosModal = undefined"
        :topping-name="showNotEnoughTacosModal"
    />
</template>
