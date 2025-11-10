<script setup lang="ts">
    import { ACHIEVEMENTS, type GameState } from '@/game';
    import { computed } from 'vue';
    import PanelSection from '../PanelSection.vue';

    const props = defineProps<{ state: GameState }>();

    const unlockedAchievements = computed(
        () => new Set(props.state.unlockedAchievements) as Set<string>,
    );
</script>

<template>
    <PanelSection title="Achievements">
        <div
            v-for="[achievementName, achievement] in Object.entries(ACHIEVEMENTS)"
            :key="achievementName"
            class="flex items-center space-x-1.5 bg-white/60 p-1"
        >
            <span
                class="flex min-h-14 min-w-14 items-center justify-center"
                :class="{ 'opacity-50': !unlockedAchievements.has(achievementName) }"
            >
                <img
                    :src="achievement.icon"
                    :alt="achievementName"
                    class="h-full max-h-14 max-w-14 p-2"
                />
            </span>

            <span class="flex flex-col text-left">
                <span
                    class="flex items-center text-sm font-semibold text-gray-600"
                    :class="{ 'text-gray-600/50': !unlockedAchievements.has(achievementName) }"
                >
                    <span>{{ achievementName }}</span>
                    <span
                        v-if="unlockedAchievements.has(achievementName)"
                        class="icon-[tabler--check] -mt-0.5 ml-1 text-xl text-purple-600"
                    ></span>
                </span>
                <p
                    class="text-xs text-gray-500"
                    :class="{ 'text-gray-500/75': !unlockedAchievements.has(achievementName) }"
                >
                    {{ achievement.description }}
                </p>
            </span>
        </div>
    </PanelSection>
</template>
