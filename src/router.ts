import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'game',
            path: '/',
            component: () => import('@/views/game/GameView.vue'),
        },
        {
            name: 'about',
            path: '/about',
            component: () => import('@/views/about/AboutView.vue'),
        },
    ],
});

export default router;
