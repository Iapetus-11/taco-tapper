<script setup lang="ts">
    import { computed } from 'vue';
    import Modal from '@/components/Modal.vue';
    import { TOPPINGS } from '@/game';

    const props = defineProps<{ toppingName: keyof typeof TOPPINGS }>();
    defineEmits<{
        (evt: 'close'): void;
    }>();

    const topping = computed(() => TOPPINGS[props.toppingName]);
</script>

<template>
    <Modal @close="$emit('close')" class="flex w-72 flex-col items-center p-4">
        <h1 class="mb-2 flex items-center text-xl text-gray-800">
            <img src="/art/tacos/pixel.png" alt="Pixel Taco" class="-ml-2 mr-2 w-10" />
            Not Enough Tacos!
        </h1>

        <img :src="topping.icon" :alt="toppingName" class="mb-4 w-24" />

        <p class="mb-3 hyphens-auto text-gray-700">
            You need {{ topping.price }} tacos to purchase this topping
        </p>

        <button
            type="button"
            @click="$emit('close')"
            class="w-full rounded-lg border border-gray-400 p-1.5 transition-colors hover:bg-gray-100"
        >
            Ok
        </button>
    </Modal>
</template>
