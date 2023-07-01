import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateUsersTable1686249071838 implements MigrationInterface {
  private readonly table = new Table({
    name: 't01_users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        primaryKeyConstraintName: 'pk_user_id'
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
        name: 'created_at',
        type: 'timestamp',
        isNullable: false
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: false
      }
    ],
    uniques: [
      {
        name: 'un_user_document',
        columnNames: ['document']
      },
      {
        name: 'un_user_username',
        columnNames: ['username']
      }
    ]
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table, true, true, true)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table, true, true, true)
  }
}
