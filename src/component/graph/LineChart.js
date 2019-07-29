import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: 'realtime',
          animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
              speed: 1000
            }
          },
          toolbar: {
            show: false
          },
          zoom: {
            enabled: false
          }
        },
        tooltip: {
          enabled: true,
          x: {
            show: false
          },
          theme: 'dark',
          marker: {
            show: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          colors: ['#212121']
        },
        title: {
          text: undefined,
          align: 'left'
        },
        markers: {
          size: 0
        },
        xaxis: {
          categories: ['week 1', 'week 2', 'week 3', 'week 4'],
          labels: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        legend: {
          show: false
        },
        grid: {
          show: false
        }
      },
      series: [
        {
          name: 'Sqaut',
          data: [100, 140, 210, 200]
        }
      ]
    };
  }

  render() {
    return (
      <div id='chart'>
        <Chart
          options={this.state.options}
          series={this.state.series}
          type='line'
        />
      </div>
    );
  }
}

export default LineChart;
