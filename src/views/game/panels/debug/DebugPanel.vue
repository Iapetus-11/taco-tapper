<script setup lang="ts">
    import type { GameState } from '@/game';

    defineProps<{
        tacoAnimationState: boolean;
    }>();

    const state = defineModel<GameState>('state', { required: true });

    function yeetData() {
        window.localStorage.removeItem('game:state');
        window.location.reload();
    }
</script>

<template>
    <PanelSection title="Debug">
        <div class="flex flex-col space-y-4 bg-white bg-opacity-50">
            <p>{{ tacoAnimationState }}</p>

            <code class="whitespace-pre">
                Game State: <span class="select-text">{{ state }}</span>
            </code>
        </div>

        <div class="flex gap-2">
            <button type="button" @click="yeetData()" class="w-full bg-red-500 p-1.5">
                Yeet Data
            </button>

            <button type="button" @click="state.tacos += 1000" class="w-full bg-green-500 p-1.5">
                Add 1k
            </button>
        </div>
    </PanelSection>
</template>
