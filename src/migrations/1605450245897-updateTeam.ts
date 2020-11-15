import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTeam1605450245897 implements MigrationInterface {
  name = "updateTeam1605450245897";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "m_users" RENAME COLUMN "team" TO "teamId"`
    );
    await queryRunner.query(
      `CREATE TABLE "m_teams" ("id" SERIAL NOT NULL, "teamname" character varying(100) NOT NULL, CONSTRAINT "PK_790675a80932326541bac5f2d62" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(`ALTER TABLE "m_users" DROP COLUMN "teamId"`);
    await queryRunner.query(`ALTER TABLE "m_users" ADD "teamId" integer`);
    await queryRunner.query(
      `ALTER TABLE "m_users" ADD CONSTRAINT "FK_d59ff5686145aab54357c110cb9" FOREIGN KEY ("teamId") REFERENCES "m_teams"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "m_users" DROP CONSTRAINT "FK_d59ff5686145aab54357c110cb9"`
    );
    await queryRunner.query(`ALTER TABLE "m_users" DROP COLUMN "teamId"`);
    await queryRunner.query(
      `ALTER TABLE "m_users" ADD "teamId" character varying(100)`
    );
    await queryRunner.query(`DROP TABLE "m_teams"`);
    await queryRunner.query(
      `ALTER TABLE "m_users" RENAME COLUMN "teamId" TO "team"`
    );
  }
}
