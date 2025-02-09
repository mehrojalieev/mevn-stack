import {mount} from "@vue/test-utils"
import {describe, it, expect, vi} from "vitest"
import Login from "../views/auth/Login.vue"

describe("Login.vue",  () => {
    it( "Testing user's details via form ", async () => {
        const wrapper = mount(Login)
        const emailInput = wrapper.find('input[name="email"]')
        const passwordInput = wrapper.find('input[name="password"]')

        const submitBtn = wrapper.find('.submit-btn')
        await emailInput.setValue('example@gmail.com')
        await passwordInput.setValue('123456')
        await submitBtn.trigger('click')

        const mockSubmit = vi.fn()
        wrapper.vm.$emit = mockSubmit

        expect(mockSubmit).toHaveBeenCalledWith('submit', {
            email: 'example@gmail.com',
            password: '123456'
        })
    })
})