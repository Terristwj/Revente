import { defineStore } from 'pinia';

export const useReviewStore = defineStore({
    id: 'review', // Unique identifier (you can change this)
    state: () => ({
        reviewSubmitted: false,
    }),
    actions: {
        setReviewSubmitted(value) {
        this.reviewSubmitted = value;
        },
    },
});