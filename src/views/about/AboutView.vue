<script setup lang="ts">
    import FaqDisclosure from './FaqDisclosure.vue';
    import { ref } from 'vue';

    const openFaqDisclosure = ref<string>();

    const FAQ_QUESTIONS: { question: string; answer: string }[] = [
        {
            question: 'What are / what do the toppings do?',
            answer:
                'Toppings increase the number of tacos earned per-click by increasing your click multiplier. ' +
                'The more types of toppings unlocked increase the variety bonus which also increases the click ' +
                'multiplier. The click multiplier also applies to automatic clicks (i.e. Taco Truck, etc...).',
        },
    ];
</script>

<template>
    <div class="overflow-y-auto">
        <div class="mx-auto flex w-full max-w-5xl flex-col py-10">
            <!--        <p>-->
            <!--            After working on some other projects, and hitting a brick wall (my boyfriend and I)-->
            <!--            (girlfriend and I) we brainstormed different things that we could work on together, at least-->
            <!--            temporarily until we could find a big project to dedicate our time to. Lucky for us, our-->
            <!--            obsession with food led to the possibility of making a game dedicated to clicking spring-->
            <!--            rolls. Upon further delegation, we realized we wanted something that could be enjoyed by-->
            <!--            many groups of people, and there Taco Tapper was born. With lots of love, doodles, code, and-->
            <!--            hard work, together we made something that our friends, family, and general taco eaters-->
            <!--            could happily pass time with.-->
            <!--        </p>-->

            <!--        <p>-->
            <!--            Taco Tapper is about building your best possible Taco empire with the help of strong arms,-->
            <!--            auto clickers, and hunger!-->
            <!--        </p>-->

            <h1 class="mb-4 text-4xl text-gray-100">Frequently Asked Questions</h1>
            <div class="flex flex-col space-y-2.5">
                <FaqDisclosure
                    v-for="faqQuestion in FAQ_QUESTIONS"
                    :key="faqQuestion.question"
                    :title="faqQuestion.question"
                    v-model:open-id="openFaqDisclosure"
                >
                    <span v-html="faqQuestion.answer" />
                </FaqDisclosure>
            </div>
        </div>
    </div>
</template>
