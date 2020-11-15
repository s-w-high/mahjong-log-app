import { MigrationInterface, QueryRunner } from "typeorm";

export class northUserNullable1605421521546 implements MigrationInterface {
  name = "northUserNullable1605421521546";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" ALTER COLUMN "northuserpoint" DROP NOT NULL`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "t_match_logs"."northuserpoint" IS NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "t_match_logs"."northuserpoint" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_logs" ALTER COLUMN "northuserpoint" SET NOT NULL`
    );
  }
}
