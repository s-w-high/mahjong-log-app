import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMatchLog1605248421092 implements MigrationInterface {
  name = "CreateMatchLog1605248421092";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "match__detail_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matchcount" integer NOT NULL, "eastpoint" integer NOT NULL, "southpoint" integer NOT NULL, "westpoint" integer NOT NULL, "northpoint" integer NOT NULL, "matchId" uuid, CONSTRAINT "PK_bec8be8c4cc0b953768a0034bf2" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "match_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eastuserpoint" integer NOT NULL, "southuserpoint" integer NOT NULL, "westuserpoint" integer NOT NULL, "northuserpoint" integer NOT NULL, "created" TIMESTAMP NOT NULL, "eastuserId" uuid, "southuserId" uuid, "westuserId" uuid, "northuserId" uuid, CONSTRAINT "PK_9590cc4c3039040f9765f66e45c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "email" character varying(100) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "passwordhash" character varying(100) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "match__detail_log" ADD CONSTRAINT "FK_b05c4ebff8f06862e67beb491dc" FOREIGN KEY ("matchId") REFERENCES "match__detail_log"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_log" ADD CONSTRAINT "FK_619b792e751ad20ffa490ed95fe" FOREIGN KEY ("eastuserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_log" ADD CONSTRAINT "FK_4cbe61ec418d700411812c40aea" FOREIGN KEY ("southuserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_log" ADD CONSTRAINT "FK_a8ac1844b559dab4ae7a730bb27" FOREIGN KEY ("westuserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_log" ADD CONSTRAINT "FK_54d6cf298aa98bef7a1e8d3bf96" FOREIGN KEY ("northuserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match_log" DROP CONSTRAINT "FK_54d6cf298aa98bef7a1e8d3bf96"`
    );
    await queryRunner.query(
      `ALTER TABLE "match_log" DROP CONSTRAINT "FK_a8ac1844b559dab4ae7a730bb27"`
    );
    await queryRunner.query(
      `ALTER TABLE "match_log" DROP CONSTRAINT "FK_4cbe61ec418d700411812c40aea"`
    );
    await queryRunner.query(
      `ALTER TABLE "match_log" DROP CONSTRAINT "FK_619b792e751ad20ffa490ed95fe"`
    );
    await queryRunner.query(
      `ALTER TABLE "match__detail_log" DROP CONSTRAINT "FK_b05c4ebff8f06862e67beb491dc"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "passwordhash"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
    await queryRunner.query(`DROP TABLE "match_log"`);
    await queryRunner.query(`DROP TABLE "match__detail_log"`);
  }
}
