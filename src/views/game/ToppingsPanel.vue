<script setup lang="ts">
    import { type GameState, type ToppingDefinition, TOPPINGS } from '@/game';
    import PanelSection from '@/views/game/PanelSection.vue';
    import { useVModelRef } from '@/utils';
    import { ref } from 'vue';
    import NotEnoughTacosForToppingModal from '@/views/game/NotEnoughTacosForToppingModal.vue';

    const props = defineProps<{ state: GameState }>();
    const emit = defineEmits<{ 'update:state': [state: GameState] }>();

    const state = useVModelRef('state', { props, emit });

    const showNotEnoughTacosModal = ref<keyof typeof TOPPINGS>();

    function upgradeClick(upgradeName: keyof typeof TOPPINGS) {
        const upgrade = TOPPINGS[upgradeName];

        if (upgrade.price > state.value.tacos) {
            showNotEnoughTacosModal.value = upgradeName;
            return;
        }

        state.value.ownedToppings[upgradeName] = (state.value.ownedToppings[upgradeName] ?? 0) + 1;
        state.value.tacos -= upgrade.price;
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
                @click="() => upgradeClick(toppingName)"
                type="button"
                class="flex items-center space-x-1.5 bg-white bg-opacity-60 hover:bg-opacity-50 p-1"
            >
                <span class="flex items-center justify-center min-w-[76px]">
                    <img
                        :src="toppingProps.icon"
                        :alt="toppingName"
                        class="max-w-[76px] max-h-[76px] h-full p-2"
                    />
                </span>

                <span class="flex flex-col text-left">
                    <span class="text-sm text-gray-600 font-semibold">
                        {{ toppingName }}

                        <span v-if="state.ownedToppings[toppingName]" class="font-light text-xs">
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
