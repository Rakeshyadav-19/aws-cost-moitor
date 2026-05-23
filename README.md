# ☁ CloudCost — AWS Cost Monitor

> Real-time AWS cloud cost monitoring, budget alerts, and optimization recommendations.  
> Built for Honours in Cloud Computing · Open Source (MIT)

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8) ![NeonDB](https://img.shields.io/badge/NeonDB-Postgres-00e699) ![License](https://img.shields.io/badge/license-MIT-orange)

---

## 🚀 Features

- 📊 **Real-time cost analytics** via AWS Cost Explorer API
- 📈 **Charts** — monthly bar, daily trend, service donut
- 💡 **Optimization recommendations** based on your actual usage
- 🔔 **Budget alerts** (coming soon — SNS integration)
- 🔒 **AES-256-GCM encryption** for stored AWS keys
- ☀/🌙 **Dark & light mode**
- 🌍 **Open source** — deploy your own in minutes

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Auth | NextAuth.js |
| Database | NeonDB (Postgres) |
| ORM | Prisma |
| AWS | AWS SDK v3 — Cost Explorer |
| Charts | Recharts |
| Hosting | Vercel |

---

## 📁 Project Structure

```
aws-cost-monitor/
├── app/
│   ├── (landing)/          # Public landing page
│   │   └── page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/page.tsx
│   │   └── setup/page.tsx
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts
│   │   │   └── register/route.ts
│   │   ├── aws/costs/route.ts
│   │   └── keys/route.ts
│   ├── layout.tsx
│   ├── globals.css
│   └── providers.tsx
├── components/
│   ├── landing/            # Landing page sections
│   └── dashboard/          # Dashboard UI components
├── lib/
│   ├── auth.ts             # NextAuth config
│   ├── aws.ts              # AWS Cost Explorer helpers
│   ├── encrypt.ts          # AES-256 key encryption
│   └── prisma.ts           # Prisma client singleton
├── prisma/
│   └── schema.prisma
├── types/
│   └── next-auth.d.ts
├── middleware.ts            # Route protection
├── .env.example
└── README.md
```

---

## ⚡ Quick Start

### 1. Clone & install

```bash
git clone https://github.com/your-username/aws-cost-monitor.git
cd aws-cost-monitor
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# NeonDB — get from your Neon dashboard
DATABASE_URL="postgresql://..."

# NextAuth — generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Encryption — generate with: openssl rand -hex 32
ENCRYPTION_KEY="your-32-byte-hex-key"
```

### 3. Push database schema

```bash
npx prisma db push
npx prisma generate
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 AWS IAM Setup (Read-Only)

1. Go to **AWS Console → IAM → Users → Create user**
2. Name: `cloudcost-readonly`
3. Attach policies:
   - `AWSBillingReadOnlyAccess`
   - `AWSCostExplorerReadOnlyAccess`
4. **Security credentials → Create access key → Third-party service**
5. Copy the Access Key ID and Secret — enter them in the app setup page

---

## 🌍 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all environment variables in your Vercel project settings.

---

## 📜 License

MIT © Your Name
