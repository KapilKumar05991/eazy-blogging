-- DropForeignKey
ALTER TABLE "Blog" DROP CONSTRAINT "Blog_authorId_fkey";

-- CreateTable
CREATE TABLE "TagOnBlogs" (
    "id" TEXT NOT NULL,

    CONSTRAINT "TagOnBlogs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
