import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Roulette from "../DevTeamRoulette.vue";

describe("Roulette", () => {
  it("renders properly", () => {
    const wrapper = mount(Roulette);
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
