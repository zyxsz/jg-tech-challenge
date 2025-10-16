import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAssignmentsTable1760626797214 implements MigrationInterface {
    name = 'CreateAssignmentsTable1760626797214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks_assignments" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "taskId" character varying NOT NULL, "assignedAt" date NOT NULL, CONSTRAINT "PK_26146abdb6ec2895b92e8b3cc22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks_assignments" ADD CONSTRAINT "FK_f4c490c9296f5afd27d793c1308" FOREIGN KEY ("userId") REFERENCES "users_tasks_service"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks_assignments" ADD CONSTRAINT "FK_94c6a5830a8e42603e54223bc99" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_assignments" DROP CONSTRAINT "FK_94c6a5830a8e42603e54223bc99"`);
        await queryRunner.query(`ALTER TABLE "tasks_assignments" DROP CONSTRAINT "FK_f4c490c9296f5afd27d793c1308"`);
        await queryRunner.query(`DROP TABLE "tasks_assignments"`);
    }

}
