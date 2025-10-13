import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasksTable1760366030977 implements MigrationInterface {
    name = 'CreateTasksTable1760366030977'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_priority_enum" AS ENUM('LOW', 'MEDIUM', 'HIGH', 'URGENT')`);
        await queryRunner.query(`CREATE TYPE "public"."tasks_status_enum" AS ENUM('TODO', 'IN_PROGRESS', 'REVIEW', 'DONE')`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" character varying NOT NULL, "authorId" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "priority" "public"."tasks_priority_enum" NOT NULL, "status" "public"."tasks_status_enum" NOT NULL, "term" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b455b2f078b9a28bda8e7b3696" ON "tasks" ("authorId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_b455b2f078b9a28bda8e7b3696"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_priority_enum"`);
    }

}
