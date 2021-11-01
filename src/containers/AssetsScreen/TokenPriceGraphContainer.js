import "./AssetsScreen.scss";

import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";

const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
function TokenPriceGraphContainer({
  tokenData,
  tokenDisplayID,
}) {
    function abbreviateNumber(number) {
      let x = new BigNumber(number);
      x = x.toPrecision(5);
      x = new BigNumber(x);
      if (x > 100000) return x.toExponential();
      else return x.toNumber();
    }
  const [TRGraphDetails, setTRGraphDetails] = useState([]);
  const [tokensReleased, setTokensReleased] = useState(0);
  const [chartOption, setChartOption] = useState({
    chart: {
      type: "area",
      backgroundColor: null,
      height: "220",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: null,
    },
    plotOptions: {
      area: {
        size: "100%",
        showInLegend: false,
        lineWidth: 2,
        lineColor: "#599504",
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },
          stops: [
            [0, "rgba(132, 214, 164, 0.3)"],
            [1, "rgba(18, 28, 32, 0.3)"],
          ],
        },
        marker: {
          lineWidth: 0,
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              fillColor: "#97D10A",
              lineColor: "green",
              lineWidth: 0,
            },
          },
        },
      },
    },
    yAxis: {
      gridLineColor: "#2C432E",
      title: {
        enabled: false,
      },
    },
    xAxis: {
      categories: [1, 5, 10, 15, 20, 25, 30],
      lineColor: "#2C432E",
      labels: {
        style: {
          fontSize: "8",
          fontWeight: "300",
          color: "#696969",
        },
      },
    },
    series: [
      {
        data: [5, 14, 45, 89, 76, 31, 78],
      },
    ],
    tooltip: {
      backgroundColor: "#151517",
      borderColor: "#151517",
      borderRadius: 8,
      borderWidth: 1,
      useHTML: true,
      formatter: function () {
        return (
          '<span style="color:#97D10A">Date: <b>' +
          this.x +
          "</b> </br>Amount: <b>" +
          this.y +
          "</b></span>"
        );
      },
    },
  });

  return (
    <section className="tokenpricegraphcontainer">
      <div className="tokenpricegraphcontainer_titlecontainer">
        <div className="tokenpricegraphcontainer_titlecontainer_title">
          Portfolio Value
        </div>
        <div className="tokenpricegraphcontainer_titlecontainer_tokensreleased">
          <div className="tokenpricegraphcontainer_titlecontainer_tokensreleased_value">
            {abbreviateNumber(tokenData.portfolioValue)} {"$"}
          </div>
          <div className="tokenpricegraphcontainer_titlecontainer_tokensreleased_date">
            {datetime}
          </div>
        </div>
      </div>

      <div className="tokenpricegraphcontainer_innercontainer">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOption}
          oneToOne={true}
          updateArgs={[true, true, true]}
        />
      </div>
    </section>
  );
}

export default TokenPriceGraphContainer;
