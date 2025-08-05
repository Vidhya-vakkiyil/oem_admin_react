import {
  Card,
  CardHeader,
  FlexBox,
  FlexBoxDirection,
  Page,
  Text,
  Title,
} from "@ui5/webcomponents-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
} from "recharts";
import React from "react";

const DashboardPage = () => {
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
  ];
    const cardStyles = [
    { background: "#f8d7da", color: "#721c24" }, // red
    { background: "#d4edda", color: "#155724" }, // green
    { background: "#d1ecf1", color: "#0c5460" }, // blue
    { background: "#fff3cd", color: "#856404" }, // yellow
  ];

  const chartData = [
    { name: "Product A", users: 30 },
    { name: "Product B", users: 45 },
    { name: "Product C", users: 20 },
    { name: "Product D", users: 60 },
  ];

  return (
    <Page style={{ padding: "1rem", overflowY: "auto" }}>
      <Title level="H4" >
        Welcome to the Dashboard
      </Title>

      <FlexBox
        direction={FlexBoxDirection.Row}
        wrap="Wrap"
        style={{ gap: "1rem" }}
      >
        {/* Example Cards */}
        <Card
          style={{ width: "300px" }}
          backgroundColor={cardStyles[0].background}
          color={cardStyles[0].color}
        >
          <CardHeader titleText="Total Users" />
          <Text style={{ padding: "1rem" }}>1,234</Text>
          <CardHeader titleText="Dashboard" />
          <Text style={{ padding: "1rem" }}>$100,000</Text>
        </Card>
        <Card style={{ width: "300px" }}>
          <CardHeader titleText="Menus" />
          <Text style={{ padding: "1rem" }}>1,235</Text>
        </Card>
        <Card style={{ width: "300px" }}>
          <CardHeader titleText="Form Management" />
          <Text style={{ padding: "1rem" }}>348</Text>
        </Card>
      </FlexBox>
     <FlexBox
              direction={FlexBoxDirection.Row}
              style={{ marginTop: "2rem", gap: "2rem" }}
            >
              <Card
                header={<CardHeader titleText="User Distribution" />}
                style={{ width: "48%" }}
              >
                <PieChart
                  dimensions={[{ accessor: "name" }]}
                  measures={[
                    { accessor: "users", formatter: (val) => `${val} users` },
                  ]}
                  dataset={chartData}
                />
              </Card>

              <Card
                header={<CardHeader titleText="User Activity" />}
                style={{ width: "48%" }}
              >
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0a6ed1" />
        </BarChart>
                {/* <BarChart
                  dimensions={[{ accessor: "name" }]}
                  measures={[{ accessor: "users", label: "Users" }]}
                  dataset={chartData}
                /> */}
              </Card>
            </FlexBox>
    </Page>
  );
};

export default DashboardPage;
