import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function LambdaPage() {
  return (
    <ServiceCostPage 
      serviceName="Lambda" 
      title="Lambda Functions" 
      subtitle="Serverless execution cost analysis"
      iconName="zap"
    />
  );
}
