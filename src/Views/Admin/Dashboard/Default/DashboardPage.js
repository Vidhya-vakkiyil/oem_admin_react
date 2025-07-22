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
} from "recharts";
import React from "react";

const DashboardPage = () => {
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
  ];
  return (
    <Page style={{ padding: "1rem", overflowY: "auto" }}>
      <Title level="H4" style={{ marginBottom: "1rem" }}>
        Welcome to the Dashboard
      </Title>

      <FlexBox
        direction={FlexBoxDirection.Row}
        wrap="Wrap"
        style={{ gap: "1rem" }}
      >
        {/* Example Cards */}
        <Card color="#5e35b1" style={{ width: "300px" }}>
          <CardHeader titleText="Sales" />
          <Text style={{ padding: "1rem" }}>$150,000</Text>
        </Card>
        <Card style={{ width: "300px" }}>
          <CardHeader titleText="Orders" />
          <Text style={{ padding: "1rem" }}>1,235</Text>
        </Card>
        <Card style={{ width: "300px" }}>
          <CardHeader titleText="Active Users" />
          <Text style={{ padding: "1rem" }}>348</Text>
        </Card>
      </FlexBox>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#0a6ed1" />
        </BarChart>
      </ResponsiveContainer>
    </Page>
  );
};

export default DashboardPage;
