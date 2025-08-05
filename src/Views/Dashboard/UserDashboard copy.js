import {
  Card,
  FlexBox,
  FlexBoxDirection,
  Grid,
  Text,
  Title,
} from "@ui5/webcomponents-react";
import {
  AnalyticalCardHeader,
  NumericSideIndicator,
  CardHeader,
} from '@ui5/webcomponents-react';
import React from "react";
import { LineChart, PieChart } from "recharts";

const UserDashboard = () => {
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
    <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      {/* ShellBar */}

      {/* Welcome Text */}
      <div style={{ padding: "2rem" }}>
        <Title level="H2">Welcome, Vidhya</Title>

        {/* Colored Cards - Single Row */}
        <Grid defaultSpan="XL3 L3 M6 S12" style={{ marginTop: "2rem" }}>
          {["Users", "Tasks", "Messages", "Alerts"].map((label, i) => (
            <Card
              key={label}
              header={<CardHeader titleText={label} />}
              style={{ ...cardStyles[i], color: cardStyles[i].color }}
            >
              <Text style={{ padding: "1rem", fontSize: "1.5rem" }}>
                {Math.floor(Math.random() * 100)}
              </Text>
            </Card>
          ))}
        </Grid>

        {/* Charts Row */}
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
            header={
              <AnalyticalCardHeader
                description="Q1, 2018"
                scale="K"
                state="Error"
                subtitleText="Revenue"
                titleText="Project Cloud Transformation"
                trend="Down"
                unitOfMeasurement="EUR"
                value="65.34"
              >
                <NumericSideIndicator
                  number="100"
                  titleText="Target"
                  unit="k"
                />
                <NumericSideIndicator
                  number="34.7"
                  state="Critical"
                  titleText="Deviation"
                  unit="%"
                />
              </AnalyticalCardHeader>
            }
          >
            <LineChart
              className="chromatic-ignore"
              dataset={[
                {
                  name: "January",
                  users: 76,
                },
                {
                  name: "February",
                  users: 230,
                },
                {
                  name: "March",
                  users: 240,
                },
                {
                  name: "April",
                  users: 280,
                },
                {
                  name: "May",
                  users: 100,
                },
              ]}
              dimensions={[
                {
                  accessor: "name",
                },
              ]}
              measures={[
                {
                  accessor: "users",
                  formatter: function Xs() {},
                },
              ]}
              noLegend
            />
          </Card>
        </FlexBox>
      </div>
    </div>
  );
};

export default UserDashboard;
