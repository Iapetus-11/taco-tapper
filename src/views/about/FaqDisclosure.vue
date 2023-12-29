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

        <Transition
            enter-active-class="transition-all ease-in duration-400"
            enter-from-class="max-h-[0] !py-0"
            enter-to-class="max-h-[5rem] !py-5"
            leave-active-class="transition-all ease-out duration-400"
            leave-from-class="max-h-[5rem] !py-5"
            leave-to-class="max-h-[0] !py-0"
            mode="out-in"
        >
            <div v-if="open" class="w-full bg-violet-900 bg-opacity-80 p-5 text-lg text-gray-50">
                <slot />
            </div>
        </Transition>
    </div>
</template>
