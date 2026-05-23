import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { decrypt } from "@/lib/encrypt";
import { NextResponse } from "next/server";

export async function withAWSCredentials(handler: (settings: { accessKeyId: string, secretAccessKey: string, region: string }) => Promise<Response>) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const cred = await prisma.awsCredential.findUnique({ where: { userId } });
  
  if (!cred) {
    return NextResponse.json({ error: "AWS credentials not configured" }, { status: 400 });
  }

  try {
    const settings = {
      accessKeyId: decrypt(cred.encryptedKeyId),
      secretAccessKey: decrypt(cred.encryptedSecret),
      region: cred.region,
    };
    return await handler(settings);
  } catch (error: any) {
    console.error("AWS API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
