import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1760210001175 implements MigrationInterface {
  name = 'CreateUsersTable1760210001175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" character varying NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_415c35b9b3b6fe45a3b065030f" ON "user_entity" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_415c35b9b3b6fe45a3b065030f"`,
    );
    await queryRunner.query(`DROP TABLE "user_entity"`);
  }
}
