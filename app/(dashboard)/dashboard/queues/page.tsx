import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function MessagingPage() {
  return (
    <ServiceCostPage 
      serviceName="Simple" 
      title="Messaging Costs" 
      subtitle="SNS and SQS messaging expenditures"
      iconName="message"
    />
  );
}
