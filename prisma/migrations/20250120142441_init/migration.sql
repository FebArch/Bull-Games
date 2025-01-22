-- CreateTable
CREATE TABLE "Games" (
    "game_id" INTEGER NOT NULL,
    "gameName" TEXT NOT NULL,
    "gameDesc" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "storyline" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "specification" TEXT NOT NULL,

    CONSTRAINT "Games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "_GameFollowers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_GameFollowers_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GameFollowers_B_index" ON "_GameFollowers"("B");

-- AddForeignKey
ALTER TABLE "_GameFollowers" ADD CONSTRAINT "_GameFollowers_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("game_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameFollowers" ADD CONSTRAINT "_GameFollowers_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
