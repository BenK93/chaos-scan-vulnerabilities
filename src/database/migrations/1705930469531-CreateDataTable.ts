import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDataTable1705930469531 implements MigrationInterface {
  name = 'CreateDataTable1705930469531';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "data_collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "data" jsonb, "domain" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_28b3646061b7723d1e2ae4259de" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "data_collection"`);
  }
}
