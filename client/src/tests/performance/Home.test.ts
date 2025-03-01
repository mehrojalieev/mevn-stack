import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import Home from "../../views/Home.vue";

describe('Performance Testing HomePage', () => {
    it.skip('measures render time', () => {
        const start = performance.now()
        const wrapper = mount(Home)
        const end = performance.now()
        console.log(`Render time: ${end - start} ms`);
        expect(wrapper.exists()).toBe(true)
    })
})