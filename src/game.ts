export type GameState = {
    clicks: number;
    tacos: number;
    totalTacos: number;
    ownedToppings: OwnedToppings;
    ownedSkins: (keyof typeof SKINS)[];
    selectedSkin: keyof typeof SKINS;
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
} as const;

export type ToppingDefinition = {
    price: number;
    multiplier: number;
    icon: string;
};
export const TOPPINGS = {
    Lettuce: {
        price: 64,
        multiplier: 0.0625,
        // Efficiency: 0.001953125
        icon: '/art/toppings/cheese.png',
    },
    Onion: {
        price: 96,
        multiplier: 0.09375,
        // Efficiency: 0.001953125
        icon: '/art/toppings/onion.png',
    },
    Cheese: {
        price: 128,
        multiplier: 0.125,
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
        icon: '/art/tacos/goldy.png',
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
} as const;
export type OwnedToppings = Partial<Record<keyof typeof TOPPINGS, number>>;
