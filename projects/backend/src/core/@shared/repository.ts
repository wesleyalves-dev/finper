export type Where<Entity> = { [Property in keyof Entity]?: any }

export interface FindOneOptions<Entity> {
  where?: Where<Entity>
}

export abstract class Repository<Entity> {
  abstract get?(id: string): Promise<Entity>

  abstract findOne?(options: FindOneOptions<Entity>): Promise<Entity>

  abstract save?(data: Entity): Promise<void>

  abstract remove?(id: string): Promise<void>
}
