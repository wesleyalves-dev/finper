import env from 'env-var'

import type { AppConfig } from './config'

export function getConfig(): AppConfig {
  const environment = env
    .get('NODE_ENV')
    .default('development')
    .asEnum(['development', 'production'])

  return {
    environment,
    web: {
      port: env.get('PORT').default(3000).asInt()
    },
    database: {
      host: env.get('DB_HOST').default('localhost').asString(),
      port: env.get('DB_PORT').default(3606).asInt(),
      base: env.get('DB_BASE').default('finper').asString(),
      user: env.get('DB_USER').required().asString(),
      pass: env.get('DB_PASS').required().asString(),
      log: environment === 'development'
    },
    resource: {
      session: {
        algorithm: 'RS512',
        privateKey: Buffer.from(
          env.get('SESSION_PRIVATE_KEY').required().asString()
        ),
        publicKey: Buffer.from(
          env.get('SESSION_PUBLIC_KEY').required().asString()
        ),
        issuer: 'Finper'
      }
    }
  }
}
