declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ENV: string;
      JWT_AUTH_SECRET: string;
      JWT_RESET_SECRET: string;
      WEB_APP_URL: string;
      DATABASE_URL: string;
      MAIL_HOST: string;
      MAIL_PORT: string;
      MAIL_USER: string;
      MAIL_PASSWORD: string;
      MAIL_SECURE: string;
      MAIL_AUTH_FROM_NAME: string;
      MAIL_AUTH_FROM_EMAIL: string;
      MAIL_AUTH_FROM_SUBJECT: string;
    }
  }
}

export {};
