import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function CloudFrontPage() {
  return (
    <ServiceCostPage 
      serviceName="CloudFront" 
      title="CloudFront Costs" 
      subtitle="Content Delivery Network expenditure analysis"
      iconName="globe"
    />
  );
}
