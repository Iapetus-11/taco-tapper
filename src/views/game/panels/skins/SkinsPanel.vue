<script setup lang="ts">
    import { type GameState, SKINS, type SkinDefinition } from '@/game';
    import PanelSection from '@/views/game/panels/PanelSection.vue';
    import { useVModelRef } from '@/utils';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faCheck } from '@fortawesome/pro-solid-svg-icons';

    const props = defineProps<{ state: GameState }>();
    const emit = defineEmits<{ 'update:state': [state: GameState] }>();

    const state = useVModelRef('state', { props, emit });

    function tacoClick(taco: keyof typeof SKINS) {
        if (!props.state.ownedSkins.includes(taco)) {
            // TODO: Purchase modal
            state.value.ownedSkins.push(taco);
        }

        state.value.selectedSkin = taco;
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
                @click="() => tacoClick(tacoName)"
                type="button"
                class="flex items-center space-x-1.5 bg-white bg-opacity-60 hover:bg-opacity-50 p-1 w-full"
            >
                <span class="flex items-center justify-center min-w-[96px] min-h-[74px]">
                    <img
                        :src="tacoProps.icon"
                        :alt="tacoName"
                        class="max-w-[96px] max-h-[74px] h-full w-fit p-2"
                    />
                </span>

                <span class="flex flex-col !mx-2 text-left">
                    <span class="text-gray-800">
                        {{ tacoName }}

                        <span
                            v-if="tacoProps.price && !state.ownedSkins.includes(tacoName)"
                            class="font-light text-sm"
                        >
                            [{{ tacoProps.price }}]
                        </span>
                    </span>
                    <span class="text-gray-600 text-xs">{{ tacoProps.description }}</span>
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
</template>
