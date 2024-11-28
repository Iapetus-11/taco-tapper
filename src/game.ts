export type GameState = {
    clicks: number;
    userClicks: number;
    fractionClicks: number;

    tacos: number;
    totalTacos: number;

    ownedToppings: OwnedToppings;
    ownedAutoClickers: OwnedAutoClickers;

    ownedSkins: (keyof typeof SKINS)[];
    selectedSkin: keyof typeof SKINS;

    unlockedAchievements: (keyof typeof ACHIEVEMENTS)[];
};

export type SkinDefinition = {
    icon: string;
    price: number;
    description: string;
};
export const SKINS = {
    'The Original': {
        icon: '/art/tacos/the_original.png',
        price: 0,
        description: 'The vanilla ice-cream of tacos, but a taco not ice-cream',
    },
    Muscle: {
        icon: '/art/tacos/muscle.png',
        price: 4096,
        description: 'He really loves his mom',
    },
    Pixel: {
        icon: '/art/tacos/pixel.png',
        price: 8192,
        description: 'Mmmmmm pixels...',
    },
    Goldie: {
        icon: '/art/tacos/goldy.png',
        price: 32768,
        description: 'Bold, brilliant, and shiny gold',
    },
    Santa: {
        icon: '/art/tacos/santa.png',
        price: 16384,
        description: 'Lots of presents hidden in his tortilla!',
    },
    'Bass Pro Fish': {
        icon: '/art/tacos/fish.png',
        price: 16384,
        description: 'Men love me, fish fear me',
    },
} as const satisfies Record<string, SkinDefinition>;

export type ToppingDefinition = {
    price: number;
    multiplier: number;
    icon: string;
};
export const TOPPINGS = {
    Lettuce: {
        price: 64,
        multiplier: 0.0625,
        icon: '/art/toppings/lettuce.png',
    },
    'Sour Cream': {
        price: 96,
        multiplier: 0.09375,
        icon: '/art/toppings/sour_cream.png',
    },
    Onion: {
        price: 128,
        multiplier: 0.125,
        icon: '/art/toppings/onion.png',
    },
    Cheese: {
        price: 192,
        multiplier: 0.1875,
        icon: '/art/toppings/cheese.png',
    },
    Cilantro: {
        price: 256,
        multiplier: 0.25,
        icon: '/art/toppings/cilantro.png',
    },
    Lime: {
        price: 512,
        multiplier: 0.5,
        icon: '/art/toppings/lime.png',
    },
    Tomato: {
        price: 1024,
        multiplier: 1,
        icon: '/art/toppings/tomato.png',
    },
    Rice: {
        price: 2048,
        multiplier: 2,
        icon: '/art/toppings/rice.png',
    },
    Salsa: {
        price: 4096,
        multiplier: 4,
        icon: '/art/toppings/salsa.png',
    },
    Guacamole: {
        price: 8192,
        multiplier: 8,
        icon: '/art/toppings/guacamole.png',
    },
    'Super Spicy Death Salsa': {
        price: 16384,
        multiplier: 16,
        icon: '/art/toppings/super_spicy_salsa.png',
    },
} as const satisfies Record<string, ToppingDefinition>;
export type OwnedToppings = Partial<Record<keyof typeof TOPPINGS, number>>;

export type AutoClickerDefinition = {
    price: number;
    cps: number;
    icon: string;
};
export const AUTO_CLICKERS = {
    'Taco Truck': {
        price: 256,
        cps: 0.1,
        icon: '/art/automation/taco_truck.png',
    },
    'Taco Shack': {
        price: 2048,
        cps: 0.45,
        icon: '/art/tacos/goldy.png',
    },
    'Taco Restaurant': {
        price: 8192,
        cps: 2.25,
        icon: '/art/tacos/goldy.png',
    },
    'Taco Factory': {
        price: 32768,
        cps: 10.8,
        icon: '/art/tacos/goldy.png',
    },
    'Taco Instantaneo-materializer-inator': {
        price: 524288,
        cps: 202,
        icon: '/art/tacos/goldy.png',
    },
} as const satisfies Record<string, AutoClickerDefinition>;
export type OwnedAutoClickers = Partial<Record<keyof typeof AUTO_CLICKERS, number>>;

export type AchievementDefinition = {
    description: string;
    icon: string;
    condition: (state: GameState) => boolean;
};
export const ACHIEVEMENTS = {
    'Taco Enjoyer': {
        description: 'Earn a total of 256 tacos',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.totalTacos >= 256;
        },
    },
    'Taco Muncher': {
        description: 'Earn a total of 1024 tacos',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.totalTacos >= 1024;
        },
    },
    'Taco Devourer': {
        description: 'Earn a total of 8192 tacos',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.totalTacos >= 8192;
        },
    },
    'Taco Assassin': {
        description: 'Earn a total of 131072 tacos',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.totalTacos >= 131072;
        },
    },
    'Taco Destroyer': {
        description: 'Earn a total of 4194304 tacos',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.totalTacos >= 4194304;
        },
    },
    'Taco Annihilator': {
        description: 'Earn a total of 268435456 tacos',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.totalTacos >= 268435456;
        },
    },

    'Big Spender I': {
        description: 'Spend 8192 tacos on skins, toppings, or automation',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return Math.floor(state.totalTacos - state.tacos) >= 8192;
        },
    },
    'Big Spender II': {
        description: 'Spend 262144 tacos on skins, toppings, or automation',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return Math.floor(state.totalTacos - state.tacos) >= 262144;
        },
    },
    'Big Spender III': {
        description: 'Spend 16777216 tacos on skins, toppings, or automation',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return Math.floor(state.totalTacos - state.tacos) >= 16777216;
        },
    },
    'Big Spender IV': {
        description: 'Spend 1073741824 tacos on skins, toppings, or automation',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return Math.floor(state.totalTacos - state.tacos) >= 1073741824;
        },
    },

    'Scrooge McDuck': {
        description: 'Hoard 16777216 tacos or more at once',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.tacos > 16777216;
        },
    },

    'Costume Party': {
        description: 'Unlock 3 or more skins',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            return state.ownedSkins.length >= 3;
        },
    },

    'Gifted Student': {
        description: 'Unlock 3 or more achievements',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            type PartialGameStateToAvoidCircularTypes = { unlockedAchievements: string[] };
            return (state as PartialGameStateToAvoidCircularTypes).unlockedAchievements.length >= 3;
        },
    },
    'Achievement Achievement': {
        description: 'Unlock 12 or more achievements',
        icon: '/art/tacos/goldy.png',
        condition(state) {
            type PartialGameStateToAvoidCircularTypes = { unlockedAchievements: string[] };
            return (
                (state as PartialGameStateToAvoidCircularTypes).unlockedAchievements.length >= 12
            );
        },
    },
} as const satisfies Record<string, AchievementDefinition>;
