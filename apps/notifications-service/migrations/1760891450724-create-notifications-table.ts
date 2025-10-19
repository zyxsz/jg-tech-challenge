import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1760891450724 implements MigrationInterface {
    name = 'CreateNotificationsTable1760891450724'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "targetId" character varying, "isGlobal" boolean NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6a72c3c0f683f6462415e653c3a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2148e43934b78b21655fe441e1" ON "notifications" ("targetId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_2148e43934b78b21655fe441e1"`);
        await queryRunner.query(`DROP TABLE "notifications"`);
    }

}
