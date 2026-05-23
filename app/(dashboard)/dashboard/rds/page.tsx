import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function RDSPage() {
  return (
    <ServiceCostPage 
      serviceName="RDS" 
      title="RDS Databases" 
      subtitle="Relational database service expenditures"
      iconName="database"
    />
  );
}
