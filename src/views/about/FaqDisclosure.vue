<script lang="ts">
    let _id = 0;
</script>

<script setup lang="ts">
    import { computed } from 'vue';
    import { faChevronDown } from '@fortawesome/pro-solid-svg-icons';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

    const props = defineProps<{ title: string; openId: string | undefined }>();
    const emit = defineEmits<{ (evt: 'update:openId', openId: string | undefined): void }>();

    const id = `FaqDisclosure-${_id++}`;

    const open = computed({
        get: () => props.openId === id,
        set: (value: boolean) => emit('update:openId', value ? id : undefined),
    });
</script>

<template>
    <div class="overflow-hidden rounded-xl border-[1.5px] border-violet-500 border-opacity-75">
        <button
            @click="open = !open"
            type="button"
            class="flex w-full items-center justify-between bg-violet-700 bg-opacity-90 p-5 text-left text-lg text-gray-100 shadow-md transition hover:bg-opacity-80 md:text-xl"
        >
            {{ title }}

            <span
                class="ml-4 mr-0.5 transition-all duration-[500ms]"
                :class="open ? 'rotate-0' : '-rotate-[450deg]'"
            >
                <FontAwesomeIcon :icon="faChevronDown" class="scale-[80%]" />
            </span>
        </button>

        <div
            class="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[400ms] ease-out bg-violet-900"
            :class="{ 'grid-rows-[1fr]': open }"
        >
            <div class="w-full overflow-hidden bg-opacity-80 text-lg text-gray-50">
                <div class="p-5">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
