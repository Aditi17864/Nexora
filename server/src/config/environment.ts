export const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value || defaultValue || "";
};

export const config = {
  port: parseInt(getEnv("PORT", "5000")),
  nodeEnv: getEnv("NODE_ENV", "development"),
  mongoUri: getEnv("MONGODB_URI", "mongodb://localhost:27017/nexora"),
  jwtSecret: getEnv("JWT_SECRET", "your_jwt_secret_key_here"),
  jwtExpire: getEnv("JWT_EXPIRE", "7d"),
  jwtRefreshSecret: getEnv("JWT_REFRESH_SECRET", "your_refresh_jwt_secret_key_here"),
  jwtRefreshExpire: getEnv("JWT_REFRESH_EXPIRE", "30d"),
  corsOrigin: getEnv("CORS_ORIGIN", "http://localhost:5173"),
};
