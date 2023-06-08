import { type MigrationInterface, type QueryRunner, Table } from 'typeorm'

export class CreateSessionsTable1686249493183 implements MigrationInterface {
  private readonly table = new Table({
    name: 'fin_sessions',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        primaryKeyConstraintName: 'pk_session_id'
      },
      {
        name: 'user_id',
        type: 'uuid',
        isNullable: false
      },
      {
        name: 'expire_in',
        type: 'timestamp',
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
    foreignKeys: [
      {
        name: 'fk_session_user',
        columnNames: ['user_id'],
        referencedTableName: 'fin_users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
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
