<script setup lang="ts">
    import type { AchievementDefinition } from '@/game';
    import Modal from '@/components/Modal.vue';

    defineProps<{
        achievementName: string;
        achievement: AchievementDefinition;
    }>();
</script>

<template>
    <Modal class="flex flex-col p-6 min-w-[28rem]">
        <img :src="achievement.icon" :alt="achievementName" class="w-56 mx-auto mb-8">

        <h2 class="text-gray-200 text-center text-xl">Achievement Unlocked:</h2>
        <h1 class="text-gray-100 text-5xl text-center font-medium">{{ achievementName }}!</h1>

        <p class="text-gray-200 text-center italic mt-1">{{ achievement.description }}</p>

        <button
            type="button"
            @click="$emit('close')"
            class="w-full max-w-[16rem] self-center mt-6 rounded-lg border border-purple-400 p-1.5 transition-colors hover:bg-purple-300/50 text-gray-100"
        >
            Ok
        </button>
    </Modal>
</template>