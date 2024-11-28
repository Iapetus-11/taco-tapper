import type { DeepReadonly, Ref, UnwrapRef, WatchOptions } from 'vue';
import { onBeforeUnmount, onMounted, readonly, ref, watch } from 'vue';

/**
 * Recursively adds missing keys to target from defaults
 */
export function fillInDefaultsDeep(target: any, defaults: any) {
    Object.entries(defaults).forEach(([key, value]) => {
        if (!(key in target)) {
            target[key] = value;
        }
    });

    Object.entries(target).forEach(([key, value]) => {
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

/**
 * A composable for persisting any JSON serializable data in localStorage between sessions
 */
export function usePersistedRef<T>(key: string, initialValue: T): Ref<UnwrapRef<T>>;
export function usePersistedRef<T>(key: string, initialValue?: T): Ref<UnwrapRef<T> | null> {
    const store = ref(initialValue ?? null) as Ref<UnwrapRef<T> | null>;

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

            if (initialValue !== undefined && initialValue !== null) {
                fillInDefaultsDeep(store.value!, initialValue);
            }
        }
    });

    onBeforeUnmount(() => window.removeEventListener('storage', onStorage));

    return store;
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
} as const satisfies Record<string, string>;

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

export function useInterval(callback: () => void, timeout: number): void {
    let interval: number | null = null;

    onMounted(() => (interval = setInterval(callback, timeout)));
    onBeforeUnmount(() => clearTimeout(interval!));
}

/**
 * @param source The value that should be throttled when changed
 * @param delayMs The delay in milliseconds that should be waited when throttling
 * @returns The throttled value of 'source'
 */
export function throttledRef<T>(
    source: Ref<T>,
    delayMs: number,
    options?: WatchOptions<false> | undefined,
): DeepReadonly<Ref<T>> {
    const throttledValue = ref(source.value) as Ref<T>;
    let timeout: number | undefined;
    let lastUpdate = performance.now();

    watch(
        source,
        () => {
            const delta = performance.now() - lastUpdate;

            if (delta < delayMs && timeout) clearTimeout(timeout);

            timeout = setTimeout(() => {
                if (Array.isArray(source.value)) {
                    throttledValue.value = [...source.value] as T;
                } else if (typeof source.value === 'object') {
                    throttledValue.value = { ...source.value } as T;
                } else {
                    throttledValue.value = source.value;
                }

                lastUpdate = performance.now();
            }, delayMs - delta);
        },
        options,
    );

    return readonly(throttledValue);
}

export function asyncEvent(): { waiter: Promise<void>; set: () => void } {
    let resolve: () => void;
    const promise = new Promise<void>((r) => (resolve = r));

    return { waiter: promise, set: resolve! };
}
