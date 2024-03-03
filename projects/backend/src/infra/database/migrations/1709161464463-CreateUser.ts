import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUser1709161464463 implements MigrationInterface {
  private readonly tableName = 'users'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'full_name',
            type: 'text',
            isNullable: true
          },
          {
            name: 'document',
            type: 'text',
            isNullable: true
          },
          {
            name: 'username',
            type: 'text',
            isNullable: false
          },
          {
            name: 'password',
            type: 'text',
            isNullable: false
          },
          {
            name: 'sessions',
            type: 'json',
            isNullable: false
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false
          },
          {
            name: 'updated_at',
            type: 'timestamp'
          }
        ],
        uniques: [
          {
            name: 'un_user_username',
            columnNames: ['username']
          }
        ]
      }),
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.tableName, true)
  }
}
