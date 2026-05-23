import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function CloudWatchPage() {
  return (
    <ServiceCostPage 
      serviceName="CloudWatch" 
      title="Monitoring Costs" 
      subtitle="CloudWatch logs and alarm expenditures"
      iconName="activity"
    />
  );
}
