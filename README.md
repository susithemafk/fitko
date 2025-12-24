# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add
additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If
you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these
  awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and
contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel),
[Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more
information.

################## ################## moje readme.md ################## ##################

## prerequisites

musíme mít nainstalovanej Docker Engine a Podman a WSL2 extensions: Tailwind CSS IntelliSense PostCSS Language Support
Prettier

## spuštění lokálního vývoje

**spuštění databáze**

```bash
./start-database.sh
```

**spuštění nové databáze**

```bash
./start-database.sh
npx prisma db push
npx prisma migrate dev --name init
npx prisma studio
```

**příhlášení se do aplikace lokálně**

```bash
npm run dev
```

poté zadej random email a odeslat, v konzoli se zobrazí INSERT do databáze a taky link pro ověření emailu, klikni na něj

## random příkazy

zobrazení běžících kontejnerů - `docker ps` `docker container ls` celý container s databází smazat -
`docker stop spolubydlime-postgres` `docker rm spolubydlime-postgres` zjištění env proměnných v databázi -
`docker inspect spolubydlime-postgres | grep -i env -A 10` update prisma database schema: `npx prisma db push` pokud
nejsou inicializovaný tabulky, tak je musíme provést migraci `npx prisma migrate dev --name init` pro zobrazení všech
migrací použij `npx prisma migrate status` pro pull prisma migrací po pullu z Gitu dej `npx prisma migrate dev` drop all
data from database and seed it `npx prisma migrate reset` just seed the db `npx prisma db seed` pro zobrazení databáze
se buď připoj přes svoje IDE např. DBeaver nebo přes Prisma Studio, které spustíš přes `npx prisma studio` změna eol pro
linux `sed -i 's/\r$//' start-database.sh`

## novej postup spuštění a sjednocení databáze

1. pull z Gitu
2. v WSL2 run `./start-database.sh` - spustí se databáze
3. WSL2 už nepotřebujeme
4. v CMD run `pnpm db:generate` - apply migrations, keep data

poté už můžeš spustit aplikaci přes `pnpm dev`

## změma ve schématu databáze

1. změň schéma v `prisma/schema.prisma`
2. v CMD run `pnpm run db:migrate:create`

## protected routes

protected routes se nacházejí ve složce '(protected)' a již načítají session.user takže ve všech children už nemusíme
znova awaitovat atd. ale stačí použít useUser hook, POZOR! use hooky pouze v Client side komponentách

## prefetch

pro prefetch se používá api ze serveru

- `import { api } from "@/trpc/server"`

v komponentě se pak používá api pro klienta

- `import { api } from "@/trpc/react"`

prefetch se používá v layoutu nebo prostě main page komponentě kde se načtou data ze serveru. V child komponentách máme
pak přístup k funkci useQuery.

## head metadata

v každé stránce stačí přidat

```typescript
export const metadata = {
    title: "All Listings | My App",
    description: "Browse all available property listings.",
    ...
}
```

a Next.js automaticky přidá metadata do head

# Deployment databáze

stačí při lokálnim vývoji změnit URL adresu v .env `DATABASE_URL` a `DIRECT_URL` na produkční hodnoty pak se můžou
používat commandy pro databázi jako lokálně. Reset nefunguje, to se musí udělat ručně v Supabase

# Deployment aplikace

aplikace běží na Vercelu, deploy proběhne pokud commit message obsahuje `[deploy]`

# Emaily

emaily běží na Resend

# Storage

storage běží na Cloudflare R2
