<script setup lang="ts">
    import { ACHIEVEMENTS, type GameState } from '@/game';
    import { computed } from 'vue';
    import { faCheck } from '@fortawesome/pro-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import PanelSection from '../PanelSection.vue';

    const props = defineProps<{ state: GameState }>();

    const unlockedAchievements = computed(() => new Set(props.state.unlockedAchievements) as Set<string>);
</script>

<template>
    <PanelSection title="Achievements">
        <div
            v-for="[achievementName, achievement] in Object.entries(ACHIEVEMENTS)"
            :key="achievementName"
            class="flex items-center space-x-1.5 bg-white p-1 bg-opacity-60"
        >
            <span
                class="flex min-h-[56px] min-w-[56px] items-center justify-center"
                :class="{ 'opacity-50': !unlockedAchievements.has(achievementName) }"
            >
                <img
                    :src="achievement.icon"
                    :alt="achievementName"
                    class="h-full max-h-[56px] max-w-[56px] p-2"
                />
            </span>

            <span class="flex flex-col text-left">
                <span
                    class="flex items-center text-sm font-semibold text-gray-600"
                    :class="{ 'text-opacity-50': !unlockedAchievements.has(achievementName) }"
                >
                    <span>{{ achievementName }}</span>
                    <FontAwesomeIcon v-if="unlockedAchievements.has(achievementName)" :icon="faCheck" size="lg" class="-mt-0.5 ml-1.5 text-purple-600" />
                </span>
                <p
                    class="text-xs text-gray-500"
                    :class="{ 'text-opacity-75': !unlockedAchievements.has(achievementName) }"
                >
                    {{ achievement.description }}
                </p>
            </span>
        </div>
    </PanelSection>
</template>
