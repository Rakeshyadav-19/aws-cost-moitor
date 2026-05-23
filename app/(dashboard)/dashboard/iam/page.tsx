import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function IAMPage() {
  return (
    <ServiceCostPage 
      serviceName="IAM" 
      title="IAM Costs" 
      subtitle="Identity and access management related spend"
      iconName="users"
    />
  );
}
