<script setup lang="ts">
    import type { AchievementDefinition } from '@/game';
    import Modal from '@/components/Modal.vue';

    defineProps<{
        achievementName: string;
        achievement: AchievementDefinition;
    }>();
</script>

<template>
    <Modal class="flex min-w-md flex-col p-6">
        <img :src="achievement.icon" :alt="achievementName" class="mx-auto mb-8 w-56" />

        <h2 class="text-center text-xl text-gray-200">Achievement Unlocked:</h2>
        <h1 class="text-center text-5xl font-medium text-gray-100">{{ achievementName }}!</h1>

        <p class="mt-1 text-center text-gray-200 italic">{{ achievement.description }}</p>

        <button
            type="button"
            @click="$emit('close')"
            class="mt-6 w-full max-w-[16rem] self-center rounded-lg border border-purple-400 p-1.5 text-gray-100 transition-colors hover:bg-purple-300/50"
        >
            Ok
        </button>
    </Modal>
</template>
