-- AlterTable
CREATE SEQUENCE games_game_id_seq;
ALTER TABLE "Games" ALTER COLUMN "game_id" SET DEFAULT nextval('games_game_id_seq');
ALTER SEQUENCE games_game_id_seq OWNED BY "Games"."game_id";
