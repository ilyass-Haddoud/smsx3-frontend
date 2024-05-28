import { AreaCards, AreaCharts, AreaTable, AreaTableRejected, AreaTop } from "../../components";

const Dashboard = () => {
  return (
    <div className="content-area">
      <AreaTop />
      <AreaCards />
      <AreaCharts />
      <AreaTable />
      <AreaTableRejected />
    </div>
  );
};

export default Dashboard;
