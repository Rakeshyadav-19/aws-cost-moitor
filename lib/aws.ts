// lib/aws.ts
import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  GetCostAndUsageCommandInput,
} from "@aws-sdk/client-cost-explorer";

export function getCostExplorerClient(accessKeyId: string, secretAccessKey: string, region: string) {
  return new CostExplorerClient({
    region,
    credentials: { accessKeyId, secretAccessKey },
  });
}

// Get monthly costs grouped by service for the last N months
export async function getMonthlyCostsByService(
  client: CostExplorerClient,
  months: number = 6
) {
  const end = new Date();
  const start = new Date();
  start.setMonth(start.getMonth() - months);

  const params: GetCostAndUsageCommandInput = {
    TimePeriod: {
      Start: start.toISOString().split("T")[0],
      End: end.toISOString().split("T")[0],
    },
    Granularity: "MONTHLY",
    Metrics: ["UnblendedCost"],
    GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }],
  };

  const command = new GetCostAndUsageCommand(params);
  const response = await client.send(command);
  return response.ResultsByTime ?? [];
}

// Get daily costs for the current month
export async function getDailyCosts(client: CostExplorerClient) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const end = now.toISOString().split("T")[0];

  const params: GetCostAndUsageCommandInput = {
    TimePeriod: { Start: start, End: end },
    Granularity: "DAILY",
    Metrics: ["UnblendedCost"],
  };

  const command = new GetCostAndUsageCommand(params);
  const response = await client.send(command);
  return response.ResultsByTime ?? [];
}

// Get current month total cost
export async function getCurrentMonthTotal(client: CostExplorerClient): Promise<number> {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split("T")[0];
  const end = now.toISOString().split("T")[0];

  const params: GetCostAndUsageCommandInput = {
    TimePeriod: { Start: start, End: end },
    Granularity: "MONTHLY",
    Metrics: ["UnblendedCost"],
  };

  const command = new GetCostAndUsageCommand(params);
  const response = await client.send(command);
  const amount = response.ResultsByTime?.[0]?.Total?.UnblendedCost?.Amount ?? "0";
  return parseFloat(amount);
}

export async function getServiceBreakdown(client: CostExplorerClient) {
  const now = new Date();
  
  // Use a 60-day window to ensure we always get data (Current Month might be empty on day 1)
  const start = new Date();
  start.setDate(now.getDate() - 60);
  
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  const params: GetCostAndUsageCommandInput = {
    TimePeriod: { 
      Start: start.toISOString().split("T")[0], 
      End: tomorrow.toISOString().split("T")[0] 
    },
    Granularity: "MONTHLY",
    Metrics: ["UnblendedCost"],
    GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }],
  };

  const command = new GetCostAndUsageCommand(params);
  const response = await client.send(command);
  
  // Get the latest period that has data
  const periods = response.ResultsByTime || [];
  for (let i = periods.length - 1; i >= 0; i--) {
    if (periods[i].Groups && periods[i].Groups!.length > 0) {
      return periods[i].Groups || [];
    }
  }

  return [];
}
