import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "../App.vue";
import Home from "../views/Home.vue";
import Auth from "../views/auth/Auth.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/auth/", component: Auth },
  ],
});

describe("Vue Router", () => {
  it("navigates to Auth page", async () => {
    render(App, { global: { plugins: [router] } });

    await router.push("/auth/");
    expect(screen.getByText(" Page")).toBeDefined();
  });
});
