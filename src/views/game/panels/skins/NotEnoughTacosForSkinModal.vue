<script setup lang="ts">
    import { computed } from 'vue';
    import Modal from '@/components/Modal.vue';
    import { SKINS } from '@/game';

    const props = defineProps<{ skinName: keyof typeof SKINS }>();
    defineEmits<{
        (evt: 'close'): void;
    }>();

    const autoClicker = computed(() => SKINS[props.skinName]);
</script>

<template>
    <Modal @close="$emit('close')" class="flex w-72 flex-col items-center p-4">
        <h1 class="mb-2 flex items-center text-xl text-gray-100">
            <img src="/art/tacos/pixel.png" alt="Pixel Taco" class="mr-2 -ml-2 w-10" />
            Not Enough Tacos!
        </h1>

        <img :src="autoClicker.icon" :alt="skinName" class="mb-4 w-36" />

        <p class="mb-3 hyphens-auto text-gray-100">
            You need {{ autoClicker.price }} tacos to purchase this taco skin
        </p>

        <button
            type="button"
            @click="$emit('close')"
            class="w-full rounded-lg border border-purple-400 p-1.5 text-gray-100 transition-colors hover:bg-purple-300/50"
        >
            Ok
        </button>
    </Modal>
</template>
