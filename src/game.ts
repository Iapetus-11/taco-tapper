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
} as const;
export type OwnedToppings = Partial<Record<keyof typeof TOPPINGS, number>>;

export type AutoClickerDefinition = {
    price: number;
    cps: number;
    icon: string;
};
export const AUTO_CLICKERS = {
    'Taco Truck': {
        price: 128,
        cps: 0.1,
        icon: '/art/tacos/goldy.png',
    },
    'Taco Shack': {
        price: 1024,
        cps: 1,
        icon: '/art/tacos/goldy.png',
    },
    'Taco Restaurant': {
        price: 8192,
        cps: 10,
        icon: '/art/tacos/goldy.png',
    },
    'Taco Factory': {
        price: 65536,
        cps: 100,
        icon: '/art/tacos/goldy.png',
    },
    'Taco Instantaneo-materializer-inator': {
        price: 524288,
        cps: 1000,
        icon: '/art/tacos/goldy.png',
    },
} as const;
export type OwnedAutoClickers = Partial<Record<keyof typeof AUTO_CLICKERS, number>>;
