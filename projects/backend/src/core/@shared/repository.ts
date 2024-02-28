export type Where<Entity> = { [key in keyof Entity]?: any }

export type Order<Entity> = { [key in keyof Entity]?: 'ASC' | 'DESC' }

export interface FindOneOptions<Entity> {
  where?: Array<Where<Entity>>
}

export interface ListOptions<Entity> {
  where?: Array<Where<Entity>>
  order?: Order<Entity>
  take?: number
  skip?: number
}

export abstract class Repository<Entity> {
  abstract getById?(id: string): Promise<Entity>
  abstract findOne?(
    options: FindOneOptions<Entity>
  ): Promise<Entity | undefined>
  abstract list?(options: ListOptions<Entity>): Promise<void>
  abstract save?(entity: Entity): Promise<void>
  abstract delete?(entity: Entity): Promise<void>
}
