import { Cache } from "../../../src/services/helpers/Cache";

describe("Cache", () => {
  it("Add, rewrite and read element", () => {
    const cache = new Cache<number>(10);
    expect(cache.size()).toBe(0);
    expect(cache.get("1")).toBeUndefined();
    expect(cache.add("1", 24)).toBe(24);
    expect(cache.size()).toBe(1);
    expect(cache.get("1")).toBe(24);
    expect(cache.add("1", 42)).toBe(42);
    expect(cache.get("1")).toBe(42);
    expect(cache.size()).toBe(1);
  });

  it("clean", () => {
    const cache = new Cache<number>(10);
    for (const v of [1, 2, 3, 4, 5]) cache.add(v.toString(), v);
    expect(cache.size()).toBe(5);
    cache.clean();
    expect(cache.size()).toBe(0);
    for (const v of [1, 2, 3, 4, 5]) expect(cache.get(v.toString())).toBeUndefined();
    for (const v of [1, 2, 3, 4, 5]) cache.add(v.toString(), v + 10);
    expect(cache.size()).toBe(5);
    for (const v of [1, 2, 3, 4, 5]) expect(cache.get(v.toString())).toBe(v + 10);
  });

  it("handles max size", () => {
    const cache = new Cache<number>(5);
    for (const v of [1, 2, 3, 4, 5]) cache.add(v.toString(), v);
    expect(cache.size()).toBe(5);
    cache.add("6", 6);
    expect(cache.size()).toBe(5);
    expect(cache.get("1")).toBeUndefined();
    for (const v of [2, 3, 4, 5, 6]) expect(cache.get(v.toString())).toBe(v);
  });
});
