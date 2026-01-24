// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

import Grid from '@mui/material/Grid2';
import DashboardCard from '../../shared-main/DashboardCard';
import { ApexOptions } from 'apexcharts';
import { getBonusGrowth } from 'src/api/dashboard/dashboard';

const BonusUpdate = () => {
  // chart color
  const theme = useTheme();
  const [res, setRes] = useState<any>();
  const categories = res && res?.map((item: any) => item.month);
  const counts = res && res?.map((item: any) => item.count);

  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  // chart
  const seriescolumnchart = [
    {
      name: 'Admissions',
      data: counts,
    },
  ];

  const optionscolumnchart: ApexOptions = {
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
    chart: {
      type: 'bar',
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      title: {
        text: 'Bonus per Month',
      },
    },
    colors: [primary, secondary],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
    },
  };

  const cardBonusGrowth = async () => {
    try {
      const response: any = await getBonusGrowth();
      setRes(response.data);
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cardBonusGrowth();
  }, []);

  return (
    <DashboardCard title="Bonus Updates" subtitle="Overview of Bonuses">
      <Grid container spacing={3}>
        {/* Chart Column */}
        <Grid size={{ xs: 12, sm: 12 }}>
          <Box className="rounded-bars">
            <Chart
              options={optionscolumnchart}
              series={seriescolumnchart}
              type="bar"
              height={370}
            />
          </Box>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default BonusUpdate;
