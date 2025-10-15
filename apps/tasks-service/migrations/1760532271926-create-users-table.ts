import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1760532271926 implements MigrationInterface {
    name = 'CreateUsersTable1760532271926'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_tasks_service" ("id" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_fd7bbf7735408ffa6f80f6ddce6" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users_tasks_service"`);
    }

}
