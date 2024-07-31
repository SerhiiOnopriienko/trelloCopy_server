import { List } from './models/list';

class Database {
  private static instance: Database | null = null;

  private data: List[];

  private constructor() {
    this.data = [];
  }

  public static get Instance(): Database {
    if (!this.instance) {
      this.instance = new Database();
    }

    return this.instance;
  }

  public setData(data: List[]): void {
    this.data = data;
  }

  public getData(): List[] {
    return this.data;
  }
}

export { Database };
