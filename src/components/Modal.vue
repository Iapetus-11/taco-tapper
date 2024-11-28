<script lang="ts">
    export default {
        inheritAttrs: false,
    };
</script>

<script setup lang="ts">
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    const emit = defineEmits<{
        close: [];
    }>();

    const dialog = ref<HTMLDialogElement>();
    const innerContainer = ref<HTMLElement>();

    async function onWindowClick(ev: MouseEvent) {
        if (ev.target instanceof HTMLElement && !innerContainer.value!.contains(ev.target)) {
            emit('close');
        }
    }

    function onWindowKeyPress(ev: KeyboardEvent) {
        if (ev.key === 'Escape') {
            emit('close');
        }
    }

    onMounted(async () => {
        dialog.value!.showModal();

        await new Promise((resolve) => setTimeout(resolve, 200));
        window.addEventListener('click', onWindowClick);
        window.addEventListener('keydown', onWindowKeyPress);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('click', onWindowClick);
        window.removeEventListener('keydown', onWindowKeyPress);
    });
</script>

<template>
    <dialog
        ref="dialog"
        class="frosted-glass rounded-lg bg-purple-400/60 shadow-xl max-lg:!border-t-0"
    >
        <div ref="innerContainer" v-bind="$attrs">
            <slot />
        </div>
    </dialog>
</template>

<style scoped>
    @keyframes dialog {
        0% {
            opacity: 0;
            transform: scale(95%);
        }

        100% {
            opacity: 100;
            transform: scale(100%);
        }
    }

    @keyframes dialog-backdrop {
        0% {
            background-color: transparent;
        }

        100% {
            background-color: rgba(31, 41, 55, 50%);
        }
    }

    dialog {
        animation: dialog ease 300ms;
    }

    dialog::backdrop {
        animation: dialog-backdrop ease 300ms;
        animation-fill-mode: forwards;
    }
</style>
