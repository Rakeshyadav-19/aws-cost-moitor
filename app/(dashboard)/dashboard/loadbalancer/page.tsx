import ServiceCostPage from "@/components/dashboard/ServiceCostPage";

export default function LoadBalancerPage() {
  return (
    <ServiceCostPage 
      serviceName="ELB" 
      title="Load Balancer Costs" 
      subtitle="Monitoring Elastic Load Balancing expenditures"
      iconName="scale"
    />
  );
}
