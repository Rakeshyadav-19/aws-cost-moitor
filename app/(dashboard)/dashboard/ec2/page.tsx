import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function EC2Page() {
  return (
    <ServiceCostPage 
      serviceName="EC2" 
      title="EC2 Instances" 
      subtitle="Virtual server compute expenditures"
      iconName="server"
    />
  );
}
