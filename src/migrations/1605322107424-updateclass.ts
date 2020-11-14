import { MigrationInterface, QueryRunner } from "typeorm";

export class updateclass1605322107424 implements MigrationInterface {
  name = "updateclass1605322107424";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_match_detail_logs" DROP CONSTRAINT "FK_275be6e8589145edc4f921ccfe3"`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_detail_logs" ADD CONSTRAINT "FK_275be6e8589145edc4f921ccfe3" FOREIGN KEY ("matchId") REFERENCES "t_match_logs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "t_match_detail_logs" DROP CONSTRAINT "FK_275be6e8589145edc4f921ccfe3"`
    );
    await queryRunner.query(
      `ALTER TABLE "t_match_detail_logs" ADD CONSTRAINT "FK_275be6e8589145edc4f921ccfe3" FOREIGN KEY ("matchId") REFERENCES "t_match_detail_logs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }
}
