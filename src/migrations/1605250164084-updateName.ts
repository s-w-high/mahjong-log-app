import { MigrationInterface, QueryRunner } from "typeorm";

export class updateName1605250164084 implements MigrationInterface {
  name = "updateName1605250164084";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "match_detail_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matchcount" integer NOT NULL, "eastpoint" integer NOT NULL, "southpoint" integer NOT NULL, "westpoint" integer NOT NULL, "northpoint" integer NOT NULL, "matchId" uuid, CONSTRAINT "PK_8f79f588b47c40e6d1cd1890784" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "passwordhash" character varying(100) NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "match_logs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "eastuserpoint" integer NOT NULL, "southuserpoint" integer NOT NULL, "westuserpoint" integer NOT NULL, "northuserpoint" integer NOT NULL, "created" TIMESTAMP NOT NULL, "eastuserId" uuid, "southuserId" uuid, "westuserId" uuid, "northuserId" uuid, CONSTRAINT "PK_5f6e8583ca97954e797efdaf428" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "match_detail_logs" ADD CONSTRAINT "FK_2974dfb8c64a419adcd25ebe129" FOREIGN KEY ("matchId") REFERENCES "match_detail_logs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_logs" ADD CONSTRAINT "FK_41016a3c0ce3f4e5e0feaa9536d" FOREIGN KEY ("eastuserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_logs" ADD CONSTRAINT "FK_dcd8517a0f7e30e46f8e097e26a" FOREIGN KEY ("southuserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_logs" ADD CONSTRAINT "FK_8f83d697882be6b0846bc3c223e" FOREIGN KEY ("westuserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "match_logs" ADD CONSTRAINT "FK_a117db52665773446ee52a6be84" FOREIGN KEY ("northuserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "match_logs" DROP CONSTRAINT "FK_a117db52665773446ee52a6be84"`
    );
    await queryRunner.query(
      `ALTER TABLE "match_logs" DROP CONSTRAINT "FK_8f83d697882be6b0846bc3c223e"`
    );
    await queryRunner.query(
      `ALTER TABLE "match_logs" DROP CONSTRAINT "FK_dcd8517a0f7e30e46f8e097e26a"`
    );
    await queryRunner.query(
      `ALTER TABLE "match_logs" DROP CONSTRAINT "FK_41016a3c0ce3f4e5e0feaa9536d"`
    );
    await queryRunner.query(
      `ALTER TABLE "match_detail_logs" DROP CONSTRAINT "FK_2974dfb8c64a419adcd25ebe129"`
    );
    await queryRunner.query(`DROP TABLE "match_logs"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "match_detail_logs"`);
  }
}
