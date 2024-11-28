<script setup lang="ts">
    import { type GameState, type SkinDefinition, SKINS } from '@/game';
    import { faCheck } from '@fortawesome/pro-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import NotEnoughTacosForSkinModal from '@/views/game/panels/skins/NotEnoughTacosForSkinModal.vue';
    import PanelSection from '@/views/game/panels/PanelSection.vue';
    import { ref } from 'vue';

    const state = defineModel<GameState>('state', { required: true });

    const showNotEnoughTacosModal = ref<keyof typeof SKINS>();

    function buySkin(skinName: keyof typeof SKINS) {
        const skin = SKINS[skinName];

        if (!state.value.ownedSkins.includes(skinName)) {
            if (skin.price > state.value.tacos) {
                showNotEnoughTacosModal.value = skinName;
                return;
            }

            state.value.ownedSkins.push(skinName);
        }

        state.value.selectedSkin = skinName;
        state.value.tacos -= skin.price;
    }
</script>

<template>
    <PanelSection
        title="Taco Skins"
        description="Select the perfect taco for the job (the job is being tapped)"
    >
        <div class="flex flex-col divide-y-2 divide-purple-300 divide-opacity-75">
            <button
                v-for="[tacoName, tacoProps] in Object.entries(SKINS) as [
                    keyof typeof SKINS,
                    SkinDefinition,
                ][]"
                :key="tacoName"
                @click="() => buySkin(tacoName)"
                type="button"
                class="flex w-full items-center space-x-1.5 bg-white bg-opacity-60 p-1 hover:bg-opacity-50"
            >
                <span class="flex min-h-[80px] min-w-[96px] items-center justify-center">
                    <img
                        :src="tacoProps.icon"
                        :alt="tacoName"
                        class="h-full max-h-[80px] w-fit max-w-[96px] p-2"
                    />
                </span>

                <span class="!mx-2 flex flex-col text-left">
                    <span class="text-gray-800">
                        {{ tacoName }}

                        <span
                            v-if="tacoProps.price && !state.ownedSkins.includes(tacoName)"
                            class="text-sm font-light"
                        >
                            [{{ tacoProps.price }}]
                        </span>
                    </span>
                    <span class="text-xs text-gray-600">{{ tacoProps.description }}</span>
                </span>

                <FontAwesomeIcon
                    v-if="state.ownedSkins.includes(tacoName)"
                    :icon="faCheck"
                    :size="state.selectedSkin === tacoName ? 'lg' : '1x'"
                    class="!ml-auto !mr-4 text-gray-700 text-opacity-50"
                    :class="{ '!text-opacity-70': state.selectedSkin === tacoName }"
                />
            </button>
        </div>
    </PanelSection>

    <NotEnoughTacosForSkinModal
        v-if="showNotEnoughTacosModal"
        @close="showNotEnoughTacosModal = undefined"
        :skin-name="showNotEnoughTacosModal"
    />
</template>
