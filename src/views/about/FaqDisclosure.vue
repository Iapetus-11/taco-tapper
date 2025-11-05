<script setup lang="ts">
    import { computed, useId } from 'vue';
    import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    const props = defineProps<{ title: string; openId: string | undefined }>();
    const emit = defineEmits<{ (evt: 'update:openId', openId: string | undefined): void }>();

    const id = `FaqDisclosure-${useId()}`;

    const open = computed({
        get: () => props.openId === id,
        set: (value: boolean) => emit('update:openId', value ? id : undefined),
    });
</script>

<template>
    <div class="overflow-hidden rounded-xl border-[1.5px] border-violet-500/75">
        <button
            @click="open = !open"
            type="button"
            class="flex w-full items-center justify-between bg-violet-700/90 p-5 text-left text-lg text-gray-100 shadow-md transition hover:bg-violet-700/80 md:text-xl"
        >
            {{ title }}

            <span
                class="mr-0.5 ml-4 transition-all duration-500"
                :class="open ? 'rotate-0' : '-rotate-450'"
            >
                <FontAwesomeIcon :icon="faChevronDown" class="scale-[80%]" />
            </span>
        </button>

        <div
            class="grid grid-rows-[0fr] bg-violet-900 transition-[grid-template-rows] duration-400 ease-out"
            :class="{ 'grid-rows-[1fr]': open }"
        >
            <div class="w-full overflow-hidden text-lg text-gray-100">
                <div class="p-5">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
