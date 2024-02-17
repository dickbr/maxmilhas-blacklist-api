import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1707429782119 implements MigrationInterface {
    name = 'CreateTables1707429782119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "maxmilhas"."blacklist" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying NOT NULL, "client_id" uuid, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_bc665a2daeb4a8c9c57a005a10" UNIQUE ("client_id"), CONSTRAINT "PK_04dc42a96bf0914cda31b579702" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "maxmilhas"."clients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cpf" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "blacklistClientId" uuid, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "maxmilhas"."blacklist" ADD CONSTRAINT "FK_bc665a2daeb4a8c9c57a005a100" FOREIGN KEY ("client_id") REFERENCES "maxmilhas"."clients"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "maxmilhas"."blacklist" DROP CONSTRAINT "FK_bc665a2daeb4a8c9c57a005a100"`);
        await queryRunner.query(`DROP TABLE "maxmilhas"."clients"`);
        await queryRunner.query(`DROP TABLE "maxmilhas"."blacklist"`);
    }

}
