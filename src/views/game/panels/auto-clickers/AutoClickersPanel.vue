<script setup lang="ts">
    import { AUTO_CLICKERS, type AutoClickerDefinition, type GameState } from '@/game';
    import NotEnoughTacosForAutoClickerModal from './NotEnoughTacosForAutoClickerModal.vue';
    import PanelSection from '@/views/game/panels/PanelSection.vue';
    import { ref } from 'vue';
    import { useVModelRef } from '@/utils';

    const props = defineProps<{ state: GameState }>();
    const emit = defineEmits<{ 'update:state': [state: GameState] }>();

    const state = useVModelRef('state', { props, emit });

    const showNotEnoughTacosModal = ref<keyof typeof AUTO_CLICKERS>();

    function autoClickerClick(autoClickerName: keyof typeof AUTO_CLICKERS) {
        const autoClicker = AUTO_CLICKERS[autoClickerName];

        if (autoClicker.price > state.value.tacos) {
            showNotEnoughTacosModal.value = autoClickerName;
            return;
        }

        state.value.ownedAutoClickers[autoClickerName] =
            (state.value.ownedAutoClickers[autoClickerName] ?? 0) + 1;
    }
</script>

<template>
    <PanelSection
        title="Automation"
        description="The path to infinite tacos and taking over the cosmos..."
    >
        <div class="flex flex-col divide-y-2 divide-purple-300 divide-opacity-75">
            <button
                v-for="[autoClickerName, autoClickerProps] in Object.entries(AUTO_CLICKERS) as [
                    keyof typeof AUTO_CLICKERS,
                    AutoClickerDefinition,
                ][]"
                :key="autoClickerName"
                @click="autoClickerClick(autoClickerName)"
                type="button"
                class="flex items-center space-x-1.5 bg-white bg-opacity-60 p-1 hover:bg-opacity-50"
            >
                <span class="flex min-h-[76px] min-w-[76px] items-center justify-center">
                    <img
                        :src="autoClickerProps.icon"
                        :alt="autoClickerName"
                        class="h-full max-h-[76px] max-w-[76px] p-2"
                    />
                </span>

                <span class="flex flex-col text-left">
                    <span class="text-sm font-semibold text-gray-600">
                        {{ autoClickerName }}

                        <span
                            v-if="state.ownedAutoClickers[autoClickerName]"
                            class="text-xs font-light"
                        >
                            [{{ state.ownedAutoClickers[autoClickerName] }}]
                        </span>
                    </span>
                    <span class="text-xs text-gray-500">
                        Clicks automatically
                        <strong>{{ autoClickerProps.cps }}x</strong> per second, costs
                        <strong>{{ autoClickerProps.price }}</strong> tacos
                    </span>
                </span>
            </button>
        </div>
    </PanelSection>

    <NotEnoughTacosForAutoClickerModal
        v-if="showNotEnoughTacosModal"
        @close="showNotEnoughTacosModal = undefined"
        :auto-clicker-name="showNotEnoughTacosModal"
    />
</template>
