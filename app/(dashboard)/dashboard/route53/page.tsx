import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function Route53Page() {
  return (
    <ServiceCostPage 
      serviceName="Route 53" 
      title="Route 53 Costs" 
      subtitle="DNS and Domain registration expenditures"
      iconName="route"
    />
  );
}
