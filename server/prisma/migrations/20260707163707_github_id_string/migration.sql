-- DropIndex
DROP INDEX "GithubAuth_githubId_tipoCuenta_key";

-- AlterTable
ALTER TABLE "GithubAuth" ALTER COLUMN "githubId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "GithubLinkPair" ALTER COLUMN "instGithubId" SET DATA TYPE TEXT,
ALTER COLUMN "perGithubId" SET DATA TYPE TEXT;
