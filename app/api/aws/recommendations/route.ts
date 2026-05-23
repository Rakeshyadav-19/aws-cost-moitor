import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { serviceBreakdown, total, budget } = body;

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = `
You are an expert AWS Cloud Architect. 
Your task is to provide cost optimization recommendations based EXCLUSIVELY on the data provided below.
DO NOT use any external knowledge about typical AWS architectures or services not mentioned in the data.
STRICTLY follow the budget context provided.

CONTEXT DATA:
- Current Month-to-date Cost: $${total} ${budget?.currency ?? 'USD'}
- Monthly Budget Limit: $${budget?.monthlyLimit ?? 'N/A'}
- Alert Threshold: ${budget?.alertThresholdPct ?? 'N/A'}% ($${budget?.thresholdValue ?? 'N/A'})
- Service Usage Breakdown:
${JSON.stringify(serviceBreakdown, null, 2)}

INSTRUCTIONS:
1. Analyze if the current cost is approaching or exceeding the budget.
2. Identify the highest cost services from the breakdown.
3. Provide 3-5 specific recommendations to reduce costs for ONLY the services listed in the breakdown.
4. If spend is low and well within budget, suggest 1-2 ways to keep it that way.
5. Your response must be purely based on this data. No generic advice.

You MUST return a JSON array containing objects with the following schema exactly:
[{
  "icon": "string (emoji)",
  "title": "string (short title)",
  "desc": "string (strict data-driven advice)",
  "saving": "string (estimated savings or '—')",
  "severity": "string (high|medium|low)"
}]
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON array
    const recommendations = JSON.parse(responseText);

    return NextResponse.json({ recommendations });
  } catch (err: any) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ error: "Failed to generate AI recommendations." }, { status: 500 });
  }
}
