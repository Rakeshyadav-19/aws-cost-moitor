import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function NetworkPage() {
  return (
    <ServiceCostPage 
      serviceName="VPC" 
      title="VPC & Network Costs" 
      subtitle="Data transfer and networking infrastructure spend"
      iconName="shield"
    />
  );
}
