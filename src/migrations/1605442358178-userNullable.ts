import { MigrationInterface, QueryRunner } from "typeorm";

export class userNullable1605442358178 implements MigrationInterface {
  name = "userNullable1605442358178";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "m_users" ALTER COLUMN "email" DROP NOT NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "m_users"."email" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "m_users" ALTER COLUMN "passwordhash" DROP NOT NULL`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "m_users"."passwordhash" IS NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "m_users"."passwordhash" IS NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "m_users" ALTER COLUMN "passwordhash" SET NOT NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "m_users"."email" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "m_users" ALTER COLUMN "email" SET NOT NULL`
    );
  }
}
