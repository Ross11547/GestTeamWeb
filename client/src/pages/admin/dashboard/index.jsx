import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Users,
  GraduationCap,
  Building2,
  UserCheck,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  DashboardWrapper,
  Card,
  CardCharts,
  CardHeader,
  CardTitle,
  CardValue,
  ChartCard,
  ChartTitle,
  DashboardContainer,
  GridContainer,
  HeaderMeta,
  HeaderTitle,
  PageHeader,
  IconWrapper,
  TrendText,
} from "../../../style/admin/dashboardAdmin";
import { ColorsLogin, Colors } from "../../../style/colors";

// Base de tu API
const BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

const BASE_FETCH = {
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
};

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [statsData, setStatsData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        setErr("");

        // 1) Resumen
        const sRes = await fetch(`${BASE}/api/dashboard/summary`, BASE_FETCH);
        if (!sRes.ok) throw new Error(`HTTP ${sRes.status}`);
        const s = await sRes.json();

        const cards = [
          {
            label: "Docentes",
            value: s?.data?.docentes ?? 0,
            icon: Users,
          },
          {
            label: "Estudiantes",
            value: s?.data?.alumnos ?? 0,
            icon: GraduationCap,
          },
          {
            label: "Facultades",
            value: s?.data?.facultades ?? 0,
            icon: Building2,
          },
          {
            label: "Directores",
            value: s?.data?.directores ?? 0,
            icon: UserCheck,
          },
        ];

        setStatsData(cards);
        setBarChartData(
          cards.map((c) => ({
            label: c.label,
            value: c.value,
          }))
        );

        // 2) Crecimiento
        const yearTo = new Date().getFullYear();
        const yearFrom = yearTo - 5;
        const gRes = await fetch(
          `${BASE}/api/dashboard/student-growth?from=${yearFrom}&to=${yearTo}`,
          BASE_FETCH
        );
        if (!gRes.ok) throw new Error(`HTTP ${gRes.status}`);
        const g = await gRes.json();

        setLineChartData(Array.isArray(g?.data) ? g.data : []);
      } catch (e) {
        setErr(String(e.message || e));
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <DashboardWrapper>
      <DashboardContainer>
        <PageHeader>
          <HeaderTitle>Panel Administrativo UNIFRANZ</HeaderTitle>
          <HeaderMeta>
            <Calendar size={20} />
            {new Date().toLocaleDateString()}
          </HeaderMeta>
        </PageHeader>

        {err && (
          <div style={{
            color: ColorsLogin.secondary200,
            padding: "16px",
            backgroundColor: "#FFF8F5",
            borderRadius: "8px",
            marginBottom: "24px",
            border: `1px solid ${ColorsLogin.secondary100}`,
          }}>
            {err}
          </div>
        )}

        <GridContainer>
          {/* Tarjetas KPI */}
          {(loading ? [1, 2, 3, 4] : statsData).map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div>
                  <CardTitle>
                    {loading ? "Cargando..." : item.label}
                  </CardTitle>
                  <CardValue>
                    {loading ? "..." : Number(item.value ?? 0).toLocaleString()}
                  </CardValue>
                </div>
                <IconWrapper>
                  {!loading && item.icon ? (
                    <item.icon size={28} />
                  ) : (
                    <Users size={28} />
                  )}
                </IconWrapper>
              </CardHeader>
              <TrendText>
                <TrendingUp size={16} />
                <span>vs. mes anterior</span>
              </TrendText>
            </Card>
          ))}

          {/* Gráfico de Barras */}
          <ChartCard>
            <ChartTitle>Distribución Universitaria</ChartTitle>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart 
                data={loading ? [] : barChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false}
                  stroke="#e8e8e8"
                />
                <XAxis 
                  dataKey="label" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ 
                    fill: Colors.greyDark, 
                    fontSize: 14,
                    fontWeight: 500
                  }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ 
                    fill: Colors.greyLight, 
                    fontSize: 12
                  }}
                />
                <Bar
                  dataKey="value"
                  fill={ColorsLogin.secondary100}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Gráfico de Líneas */}
          <CardCharts>
            <ChartTitle>Crecimiento de Estudiantes</ChartTitle>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart 
                data={loading ? [] : lineChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3"
                  stroke="#e8e8e8"
                />
                <XAxis 
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: Colors.greyDark, 
                    fontSize: 14,
                    fontWeight: 500
                  }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: Colors.greyLight, 
                    fontSize: 12
                  }}
                />
                
                <Line
                  type="monotone"
                  dataKey="estudiantes"
                  stroke={ColorsLogin.secondary200}
                  strokeWidth={3}
                  dot={{ 
                    fill: ColorsLogin.secondary200, 
                    strokeWidth: 2,
                    stroke: Colors.white,
                    r: 5 
                  }}
                  activeDot={{ 
                    r: 7,
                    fill: ColorsLogin.secondary300,
                    stroke: Colors.white,
                    strokeWidth: 2
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardCharts>
        </GridContainer>
      </DashboardContainer>
    </DashboardWrapper>
  );
};

export default Dashboard;