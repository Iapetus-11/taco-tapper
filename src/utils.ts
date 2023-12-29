import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { Ref, UnwrapRef } from 'vue';

export function fillInDefaultsDeep(target: object, defaults: object) {
    Object.entries(defaults).forEach(([key, value]) => {
        if (!(key in target)) {
            // @ts-ignore
            target[key] = value;
        }
    });

    Object.entries(target).forEach(([key, value]) => {
        // @ts-ignore
        const defaultValue = defaults[key];

        if (
            typeof value === 'object' &&
            value !== null &&
            typeof defaultValue === 'object' &&
            defaultValue !== null
        ) {
            fillInDefaultsDeep(value, defaultValue);
        }
    });
}

export function usePersistedRef<T>(key: string, initialValue: T): Ref<UnwrapRef<T>>;
export function usePersistedRef<T>(key: string, defaultValue?: T): Ref<UnwrapRef<T> | null> {
    const store = ref(defaultValue ?? null);

    watch(
        store,
        (value) => {
            if (value === null) {
                window.localStorage.removeItem(key);
            } else {
                window.localStorage.setItem(key, JSON.stringify(value));
            }
        },
        { deep: true },
    );

    function onStorage(event: StorageEvent) {
        if (event.key !== key) {
            return;
        }

        if (event.newValue === null) {
            store.value = null;
        } else {
            store.value = JSON.parse(event.newValue);
        }
    }

    onMounted(() => {
        window.addEventListener('storage', onStorage);

        const existingValue = window.localStorage.getItem(key);
        if (existingValue !== null) {
            store.value = JSON.parse(existingValue);

            if (defaultValue !== undefined && defaultValue !== null) {
                fillInDefaultsDeep(store.value!, defaultValue);
            }
        }
    });

    onBeforeUnmount(() => window.removeEventListener('storage', onStorage));

    return store;
}

/**
 * Shortcut for creating a settable computed property for v-model
 * @param propName The name of the prop
 * @param context The props object and emit function
 */
export function useVModelRef<
    Props extends Record<string, any>,
    PropName extends Extract<keyof Props, string>,
    Emit extends (evt: `update:${PropName}`, value: Props[PropName]) => void,
>(propName: PropName, { props, emit }: { props: Props; emit: Emit }): Ref<Props[PropName]> {
    return computed({
        get: () => props[propName],
        set: (value) => emit(`update:${propName}`, value),
    });
}

export function average(values: number[]) {
    return values.reduce((sum, cur) => sum + cur, 0) / values.length;
}

export const TAILWIND_MEDIA_QUERIES = {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)',
    'max-sm': 'not all and (min-width: 640px)',
    'max-md': 'not all and (min-width: 768px)',
    'max-lg': 'not all and (min-width: 1024px)',
    'max-xl': 'not all and (min-width: 1280px)',
    'max-2xl': 'not all and (min-width: 1536px)',
} as const;

export type TailwindBreakpoint = keyof typeof TAILWIND_MEDIA_QUERIES;

/**
 * Takes a single TailwindCSS breakpoint as an argument and returns a ref which
 * changes depending on whether the breakpoint matches or not.
 */
export function useTailwindBreakpoint(breakpoint: TailwindBreakpoint): Ref<boolean> {
    const matches = ref();
    let mediaQueryList: MediaQueryList | undefined = undefined;

    function onMediaQueryChange() {
        matches.value = mediaQueryList!.matches;
    }

    onMounted(() => {
        mediaQueryList = window.matchMedia(TAILWIND_MEDIA_QUERIES[breakpoint]);
        mediaQueryList.addEventListener('change', onMediaQueryChange);
        onMediaQueryChange();
    });

    onBeforeUnmount(() => {
        mediaQueryList?.removeEventListener?.('change', onMediaQueryChange);
    });

    return matches;
}

export function useInterval(callback: () => void, timeout: number) {
    let interval: number | null = null;

    onMounted(() => (interval = setInterval(callback, timeout)));
    onBeforeUnmount(() => clearTimeout(interval!));
}
