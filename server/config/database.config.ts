class DatabaseConfig {
  private url: string;

  constructor() {
    this.url = 'mongodb://localhost:27017/test_db';
  }
}

export default DatabaseConfig;