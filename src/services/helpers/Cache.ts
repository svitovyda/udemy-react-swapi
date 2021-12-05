export class Cache<T> {
  private values: Map<string, T> = new Map();
  private max: number;

  constructor(max: number = 100) {
    if (max < 1 || !Number.isInteger(max)) throw new Error("Invalid cache size");
    this.max = max;
  }

  public get = (key: string): T | undefined => this.values.get(key);

  public add = (key: string, value: T): T => {
    if (this.values.size === this.max) {
      this.values.delete(this.values.keys().next().value);
    }
    this.values.set(key, value);
    return value;
  };

  public clean = (): void => this.values.clear();

  public size = (): number => this.values.size;
}
