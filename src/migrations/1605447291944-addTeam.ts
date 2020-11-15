import { MigrationInterface, QueryRunner } from "typeorm";

export class addTeam1605447291944 implements MigrationInterface {
  name = "addTeam1605447291944";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "m_users" ADD "team" character varying(100)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "m_users" DROP COLUMN "team"`);
  }
}
