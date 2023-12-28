<script setup lang="ts">
    import { TOPPINGS } from '@/game';
    import Modal from '@/components/Modal.vue';
    import { computed } from 'vue';

    const props = defineProps<{ toppingName: keyof typeof TOPPINGS }>();
    defineEmits<{
        (evt: 'close'): void;
    }>();

    const topping = computed(() => TOPPINGS[props.toppingName]);
</script>

<template>
    <Modal @close="$emit('close')" class="flex flex-col items-center w-72 p-4">
        <h1 class="flex items-center text-xl text-gray-800 mb-2">
            <img src="/art/tacos/pixel.png" alt="Pixel Taco" class="w-10 mr-2 -ml-2" />
            Not Enough Tacos!
        </h1>

        <img :src="topping.icon" :alt="toppingName" class="w-24 mb-4" />

        <p class="text-gray-700 hyphens-auto mb-3">
            You need {{ topping.price }} tacos to purchase this topping
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
