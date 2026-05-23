import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function S3Page() {
  return (
    <ServiceCostPage 
      serviceName="S3" 
      title="S3 Storage" 
      subtitle="Object storage and data transfer costs"
      iconName="storage"
    />
  );
}
