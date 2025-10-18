import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNotificationsTable1760709005670 implements MigrationInterface {
    name = 'CreateNotificationsTable1760709005670'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "notifications_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39dccc777268995087ce0ccd626" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "notifications_entity"`);
    }

}
