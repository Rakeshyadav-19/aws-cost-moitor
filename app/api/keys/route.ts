// app/api/keys/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { encrypt, decrypt } from "@/lib/encrypt";

// GET — check if user has saved credentials
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cred = await prisma.awsCredential.findUnique({ where: { userId: session.user.id } });
  return NextResponse.json({ hasCredentials: !!cred, region: cred?.region ?? null });
}

// POST — save encrypted AWS credentials
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { accessKeyId, secretAccessKey, region } = await req.json();

  if (!accessKeyId || !secretAccessKey || !region) {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const encryptedKeyId = encrypt(accessKeyId);
  const encryptedSecret = encrypt(secretAccessKey);

  await prisma.awsCredential.upsert({
    where: { userId: session.user.id },
    update: { encryptedKeyId, encryptedSecret, region },
    create: { userId: session.user.id, encryptedKeyId, encryptedSecret, region },
  });

  return NextResponse.json({ ok: true });
}

// DELETE — remove credentials
export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.awsCredential.deleteMany({ where: { userId: session.user.id } });
  return NextResponse.json({ ok: true });
}
