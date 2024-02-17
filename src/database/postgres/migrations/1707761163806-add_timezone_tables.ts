import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTimezoneTables1707761163806 implements MigrationInterface {
    name = 'AddTimezoneTables1707761163806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maxmilhas"."blacklist" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."blacklist" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" ADD "deleted_at" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."clients" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."blacklist" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."blacklist" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
