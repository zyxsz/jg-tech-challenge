import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCommentsTable1760384656326 implements MigrationInterface {
    name = 'CreateCommentsTable1760384656326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comments" ("id" character varying NOT NULL, "authorId" character varying NOT NULL, "content" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "taskId" character varying, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4548cc4a409b8651ec75f70e28" ON "comments" ("authorId") `);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4548cc4a409b8651ec75f70e28"`);
        await queryRunner.query(`DROP TABLE "comments"`);
    }

}
