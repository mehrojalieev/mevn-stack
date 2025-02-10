import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import Login from "../views/auth/Login.vue";
import ApiInstance from "../services/api"; // Import actual API instance

// Explicitly mock `ApiInstance.post`
vi.mock("../services/api", () => ({
  default: {
    post: vi.fn(() =>
      Promise.resolve({ data: { token: "mocked_token" } })
    ),
  },
}));

describe("Login.vue", () => {
  it("should submit user details and call API", async () => {
    const wrapper = mount(Login);
    const emailInput = wrapper.find('input[name="email"]');
    const passwordInput = wrapper.find('input[name="password"]');
    const submitBtn = wrapper.find(".submit-btn");

    await emailInput.setValue("example@gmail.com");
    await passwordInput.setValue("123456");
    await submitBtn.trigger("click");

    // Wait for Vue updates
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check if the API call was made
    expect(ApiInstance.post).toHaveBeenCalledTimes(1);
    expect(ApiInstance.post).toHaveBeenCalledWith("/auth/login", {
      email: "example@gmail.com",
      password: "123456",
    });
  });
});
