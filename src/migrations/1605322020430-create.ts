import { MigrationInterface, QueryRunner } from "typeorm";

export class create1605322020430 implements MigrationInterface {
  name = "create1605322020430";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "t_match_detail_logs" ("id" SERIAL NOT NULL, "matchcount" integer NOT NULL, "eastpoint" integer NOT NULL, "southpoint" integer NOT NULL, "westpoint" integer NOT NULL, "northpoint" integer NOT NULL, "matchId" integer, CONSTRAINT "PK_f734fe8b993ca52f8298bd84322" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "m_users" ("id" SERIAL NOT NULL, "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "passwordhash" character varying(100) NOT NULL, CONSTRAINT "PK_825f69cfddc3da200ca49504236" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "t_match_logs" ("id" SERIAL NOT NULL, "eastuserpoint" integer NOT NULL, "southuserpoint" integer NOT NULL, "westuserpoint" integer NOT NULL, "northuserpoint" integer NOT NULL, "created" TIMESTAMP NOT NULL, "eastuserId" integer, "southuserId" integer, "westuserId" integer, "northuserId" integer, CONSTRAINT "PK_d1afd977e9f94c4b446aa0987eb" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_detail_logs" ADD CONSTRAINT "FK_275be6e8589145edc4f921ccfe3" FOREIGN KEY ("matchId") REFERENCES "t_match_detail_logs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" ADD CONSTRAINT "FK_a8ee4fc5458a9cca15ed2a7865a" FOREIGN KEY ("eastuserId") REFERENCES "m_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" ADD CONSTRAINT "FK_479fc4e54374a10f0f1cad780f9" FOREIGN KEY ("southuserId") REFERENCES "m_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" ADD CONSTRAINT "FK_f9d590296d627c8a96628fe734b" FOREIGN KEY ("westuserId") REFERENCES "m_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" ADD CONSTRAINT "FK_a59672b67f544cc5a3b20c53537" FOREIGN KEY ("northuserId") REFERENCES "m_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" DROP CONSTRAINT "FK_a59672b67f544cc5a3b20c53537"`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" DROP CONSTRAINT "FK_f9d590296d627c8a96628fe734b"`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" DROP CONSTRAINT "FK_479fc4e54374a10f0f1cad780f9"`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" DROP CONSTRAINT "FK_a8ee4fc5458a9cca15ed2a7865a"`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_detail_logs" DROP CONSTRAINT "FK_275be6e8589145edc4f921ccfe3"`
    );
    await queryRunner.query(`DROP TABLE "t_match_logs"`);
    await queryRunner.query(`DROP TABLE "m_users"`);
    await queryRunner.query(`DROP TABLE "t_match_detail_logs"`);
  }
}
