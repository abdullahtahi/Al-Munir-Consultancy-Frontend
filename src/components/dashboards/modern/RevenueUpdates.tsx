// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { MenuItem, Box } from '@mui/material';
import DashboardCard from '../../shared-main/DashboardCard';
import CustomSelect from '../../forms/theme-elements/CustomSelect';
import { ApexOptions } from 'apexcharts';
import { getAdmissionGrowth } from 'src/api/dashboard/dashboard';

const AdmissionUpdate = () => {
  const [month, setMonth] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonth(event.target.value);
  };

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
        text: 'Admissions Count',
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

  const cardAdmissionGrowth = async () => {
    try {
      const response: any = await getAdmissionGrowth();
      setRes(response.data);
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cardAdmissionGrowth();
  }, []);

  return (
    <DashboardCard
      title="Admission Updates"
      subtitle="Overview of Admission"
      action={
        <CustomSelect
          labelId="month-dd"
          id="month-dd"
          size="small"
          value={month}
          onChange={handleChange}
        >
          <MenuItem value="2025">Year 2025</MenuItem>
        </CustomSelect>
      }
    >
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

export default AdmissionUpdate;
