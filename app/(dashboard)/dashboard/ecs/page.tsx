import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function ECSPage() {
  return (
    <ServiceCostPage 
      serviceName="ECS" 
      title="ECS / Container Costs" 
      subtitle="Monitoring cluster and task expenditures"
      iconName="layers"
    />
  );
}
