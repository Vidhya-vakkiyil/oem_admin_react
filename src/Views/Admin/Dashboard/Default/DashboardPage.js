import { Card, CardHeader, FlexBox, FlexBoxDirection, Page, Text, Title } from '@ui5/webcomponents-react'
import { ComposedChart } from '@ui5/webcomponents-react-charts'
import React from 'react'

const DashboardPage = () => {
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
          <ComposedChart
            dataset={[
              {
                name: "January",
                sessions: 300,
                users: 100,
                volume: 756,
              },
              {
                name: "February",
                sessions: 330,
                users: 230,
                volume: 880,
              },
              {
                name: "March",
                sessions: 404,
                users: 240,
                volume: 700,
              },
              {
                name: "April",
                sessions: 80,
                users: 280,
                volume: 604,
              },
              {
                name: "May",
                sessions: 300,
                users: 100,
                volume: 756,
              },
              {
                name: "June",
                sessions: 330,
                users: 230,
                volume: 880,
              },
              {
                name: "July",
                sessions: 470,
                users: 20,
                volume: 450,
              },
              {
                name: "August",
                sessions: 180,
                users: 220,
                volume: 104,
              },
              {
                name: "September",
                sessions: 360,
                users: 200,
                volume: 1000,
              },
              {
                name: "October",
                sessions: 500,
                users: 250,
                volume: 200,
              },
              {
                name: "November",
                sessions: 404,
                users: 240,
                volume: 700,
              },
              {
                name: "December",
                sessions: 80,
                users: 280,
                volume: 604,
              },
            ]}
            dimensions={[
              {
                accessor: "name",
                formatter: function Xs() {},
                interval: 0,
              },
            ]}
            measures={[
              {
                accessor: "sessions",
                label: "Active Sessions",
                type: "bar",
              },
              {
                accessor: "users",
                formatter: function Xs() {},
                label: "Users",
                type: "area",
              },
              {
                accessor: "volume",
                formatter: function Xs() {},
                label: "Vol.",
                type: "line",
              },
            ]}
            onClick={function Xs() {}}
            onDataPointClick={function Xs() {}}
            onLegendClick={function Xs() {}}
          />
        </Page>
  )
}

export default DashboardPage
