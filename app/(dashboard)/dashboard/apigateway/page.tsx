import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function APIGatewayPage() {
  return (
    <ServiceCostPage 
      serviceName="API Gateway" 
      title="API Gateway Costs" 
      subtitle="REST and WebSocket API spend monitoring"
      iconName="webhook"
    />
  );
}
