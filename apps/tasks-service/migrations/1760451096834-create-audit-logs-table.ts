import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuditLogsTable1760451096834 implements MigrationInterface {
    name = 'CreateAuditLogsTable1760451096834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."audit_logs_actiontype_enum" AS ENUM('UPDATE', 'CREATE')`);
        await queryRunner.query(`CREATE TABLE "audit_logs" ("id" character varying NOT NULL, "authorId" character varying NOT NULL, "taskId" character varying NOT NULL, "actionType" "public"."audit_logs_actiontype_enum" NOT NULL, "modifications" json NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1bb179d048bbc581caa3b013439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "taskId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "audit_logs" ADD CONSTRAINT "FK_d038705a567505c35b669ab00ca" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`ALTER TABLE "audit_logs" DROP CONSTRAINT "FK_d038705a567505c35b669ab00ca"`);
        await queryRunner.query(`ALTER TABLE "comments" ALTER COLUMN "taskId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`DROP TABLE "audit_logs"`);
        await queryRunner.query(`DROP TYPE "public"."audit_logs_actiontype_enum"`);
    }

}
