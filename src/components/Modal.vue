<script setup lang="ts">
    import { onBeforeUnmount, onMounted, ref } from 'vue';

    defineOptions({
        inheritAttrs: false,
    });

    const emit = defineEmits<{
        close: [];
    }>();

    const shownTime = performance.now();

    function close() {
        // Prevent modal closing for first second, in case they're spamming
        if (performance.now() - shownTime >= 1000) {
            emit('close');
        }
    }

    const dialog = ref<HTMLDialogElement>();
    const innerContainer = ref<HTMLElement>();

    async function onWindowClick(ev: MouseEvent) {
        if (ev.target instanceof HTMLElement && !innerContainer.value!.contains(ev.target)) {
            close();
        }
    }

    function onWindowKeyPress(ev: KeyboardEvent) {
        if (ev.key === 'Escape') {
            close();
        }
    }

    onMounted(() => {
        dialog.value!.showModal();

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
        class="frosted-glass rounded-lg bg-purple-400/60 shadow-xl max-lg:border-t-0!"
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
        margin: auto;
        animation: dialog ease 300ms;
    }

    dialog::backdrop {
        animation: dialog-backdrop ease 300ms;
        animation-fill-mode: forwards;
    }
</style>
