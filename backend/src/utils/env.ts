function requireEnv(key: string) {
    const value = process.env[key];

    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }

    return value;
}

const env = {
    PORT: requireEnv("PORT"),
    DATABASE_URL: requireEnv("DATABASE_URL"),
    FRONTEND_URL: requireEnv("FRONTEND_URL"),
    NODE_ENV: requireEnv("NODE_ENV") as "development" | "production",
    CLERK_SECRET_KEY: requireEnv("CLERK_SECRET_KEY"),
    CLERK_PUBLISHABLE_KEY: requireEnv("CLERK_PUBLISHABLE_KEY"),
};

export default env;
