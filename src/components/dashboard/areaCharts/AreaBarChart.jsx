import { useContext, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../../context/ThemeContext";
import { FaArrowUpLong } from "react-icons/fa6";
import { LIGHT_THEME } from "../../../constants/themeConstants";
import "./AreaCharts.scss";
import getFournisseursApi from "../../../api/getFournisseursApi";

const AreaBarChart = () => {
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [validatedInvoicesCount, setValidatedInvoicesCount] = useState(0);
  const [newInvoicesCount, setNewInvoicesCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fournisseurs = await getFournisseursApi();
        let totalValidated = 0;
        let totalNewInvoices = 0;

        const data = fournisseurs.slice(0, 9).map(fournisseur => {
          const validInvoices = fournisseur.invoices.filter(invoice => invoice.etat === 4).length;
          totalValidated += validInvoices;

          const rejectedInvoices = fournisseur.invoices.filter(invoice => invoice.etat === 6).length;

          const today = new Date();
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);

          const newInvoices = fournisseur.invoices.filter(invoice => {
            const invoiceDate = new Date(invoice.createdAt);
            return invoiceDate >= yesterday && invoiceDate < today;
          }).length;

          totalNewInvoices += newInvoices;

          return {
            "Fournisseur": fournisseur.bpsnum,
            "Validée": validInvoices,
            "Rejetée": rejectedInvoices,
          };
        });

        setData(data);
        setValidatedInvoicesCount(totalValidated);
        setNewInvoicesCount(totalNewInvoices);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTooltipValue = (value) => `${value}`;

  const formatYAxisLabel = (value) => `${value}`;

  const formatLegendValue = (value) => value.charAt(0).toUpperCase() + value.slice(1);

  return (
    <div className="bar-chart">
      <div className="bar-chart-info">
        <h5 className="bar-chart-title">État de facturation</h5>
        <div className="chart-info-data">
          <div className="info-data-value">{validatedInvoicesCount} validée</div>
          <div className="info-data-text">
            <FaArrowUpLong />
            <p>{newInvoicesCount} nouvelles factures depuis hier.</p>
          </div>
        </div>
      </div>
      <div className="bar-chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={200}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
          >
            <XAxis
              padding={{ left: 10 }}
              dataKey="Fournisseur"
              tickSize={0}
              axisLine={false}
              tick={{
                fill:"#676767",
                fontSize: 14,
              }}
            />
            <YAxis
              padding={{ bottom: 10, top: 10 }}
              tickFormatter={formatYAxisLabel}
              axisLine={false}
              tickSize={0}
              tick={{
                fill: "#676767",
              }}
            />
            <Tooltip
              formatter={formatTooltipValue}
              cursor={{ fill: "transparent" }}
            />
            <Legend
              iconType="circle"
              iconSize={10}
              verticalAlign="top"
              align="right"
              formatter={formatLegendValue}
            />
            <Bar
              dataKey="Validée"
              fill="#475be8"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
            <Bar
              dataKey="Rejetée"
              fill="#e3e7fc"
              activeBar={false}
              isAnimationActive={false}
              barSize={24}
              radius={[4, 4, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaBarChart;
