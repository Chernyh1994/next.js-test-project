class AppConfig {
  private port: any;
  private environment: any;

  constructor() {
    this.port = process.env.PORT || 3000;
    this.environment = process.env.NODE_ENV || 'local'
  }
}

export default AppConfig;