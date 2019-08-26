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
            show: false
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
          size: 0,
          colors: ['#fff']
        },
        xaxis: {
          categories: props.data.categories,
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
      series: []
    };
  }

  componentDidMount() {
    console.log(this.props.data);
    this.props.data.data.map((item, index) => {
      this.state.series.push({
        name: `Week ${index + 1}`,
        data: [item.reps, item.sets, item.max]
      });
    }, console.log(this.state.series));
    // {
    //   name: props.data.series[0].name,
    //     data: props.data.series[0].data
    // }
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
