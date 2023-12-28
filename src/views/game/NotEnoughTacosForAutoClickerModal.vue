<script setup lang="ts">
    import { AUTO_CLICKERS } from '@/game';
    import Modal from '@/components/Modal.vue';
    import { computed } from 'vue';

    const props = defineProps<{ autoClickerName: keyof typeof AUTO_CLICKERS }>();
    defineEmits<{
        (evt: 'close'): void;
    }>();

    const autoClicker = computed(() => AUTO_CLICKERS[props.autoClickerName]);
</script>

<template>
    <Modal @close="$emit('close')" class="flex flex-col items-center w-72 p-4">
        <h1 class="flex items-center text-xl text-gray-800 mb-2">
            <img src="/art/tacos/pixel.png" alt="Pixel Taco" class="w-10 mr-2 -ml-2" />
            Not Enough Tacos!
        </h1>

        <img :src="autoClicker.icon" :alt="autoClickerName" class="w-36 mb-4" />

        <p class="text-gray-700 hyphens-auto mb-3">
            You need {{ autoClicker.price }} tacos to purchase this auto clicker
        </p>

        <button
            type="button"
            @click="$emit('close')"
            class="w-full p-1.5 border border-gray-400 hover:bg-gray-100 transition-colors rounded-lg"
        >
            Ok
        </button>
    </Modal>
</template>
