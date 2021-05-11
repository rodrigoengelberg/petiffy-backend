import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export default class CreatePetitionsDemand1601469847641
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'petitionsDemand',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
          },
          {
            name: 'petition_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    )
    
    await queryRunner.createForeignKey(
      'petitions',
      new TableForeignKey({
        name: 'PetitionsProvider',
        columnNames: ['petition_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'petitions',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('petitionsDemand');
  }
  
}
