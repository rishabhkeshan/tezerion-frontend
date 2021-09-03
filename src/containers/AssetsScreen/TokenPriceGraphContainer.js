import "./AssetsScreen.scss";

import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";

const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
function TokenPriceGraphContainer({
  projectOverviewData,
  projectDisplayID,
}) {
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
  // useEffect(() => {
  //   displayTokenReleaseGraphDetails();
  // }, [projectDisplayID, projectOverviewData]);
  // const displayTokenReleaseGraphDetails = async () => {
  //   if (projectOverviewData) {
  //     let currentProject = projectOverviewData[projectDisplayID];
  //     currentProject = [currentProject]
  //       .map((project) =>
  //         project?.derivatives
  //           .map((derivative, _index) =>
  //             derivative.holders.map((holder, index) => {
  //               const unixTime = derivative.unlockTime;
  //               const date = new Date(unixTime * 1000);
  //               let unlockDate = date.toLocaleDateString("en-US");
  //               let unlockDay = date.toLocaleDateString("en-US", {
  //                 day: "numeric",
  //               });
  //               let unlockMonth = date.toLocaleDateString("en-US", {
  //                 month: "short",
  //               });
  //               let unlockYear = date.toLocaleDateString("en-US", {
  //                 year: "2-digit",
  //               });
  //               let displayGraphDate = `${unlockDay} ${unlockMonth}, ${unlockYear}`;
  //               let numOfTokens = new BigNumber(holder?.tokenAmount)
  //                 .dividedBy(Math.pow(10, project.projectTokenDecimal))
  //                 .toNumber();

  //               return {
  //                 address: holder.address,
  //                 date: unlockDate,
  //                 unixDate: date,
  //                 numOfTokens,
  //                 amount: numOfTokens
  //                   .toString()
  //                   .concat(" ")
  //                   .concat(project.projectTokenTicker),
  //                 projectTokenTicker: project.projectTokenTicker,
  //                 totalSupply: derivative.totalSupply,
  //                 displayGraphDate,
  //                 decimal: project.projectTokenDecimal,
  //               };
  //             })
  //           )
  //           .flat()
  //       )
  //       .flat();
  //     currentProject.sort((a, b) => new Date(a.date) - new Date(b.date));
  //     let tre = 0;
  //     currentProject.map((project) => {
  //       if (currentDate > project.unixDate) {
  //         tre = tre + project.numOfTokens;
  //       }
  //       return tre;
  //     });
  //     setTokensReleased(tre);
  //     let charXAxis = [];
  //     let charYAxis = [];
  //     currentProject.forEach((element) => {
  //       charXAxis.push(element.displayGraphDate);
  //       charYAxis.push(
  //         parseInt(element.totalSupply) / 10 ** parseInt(element.decimal)
  //       );
  //     });
  //     setChartOption({
  //       ...chartOption,
  //       xAxis: { ...chartOption.xAxis, categories: charXAxis },
  //       series: [{ data: charYAxis }],
  //     });
  //     setTRGraphDetails([...currentProject]);
  //   }
  // };

  return (
    <section className="tokenpricegraphcontainer">
      <div className="tokenpricegraphcontainer_titlecontainer">
        <div className="tokenpricegraphcontainer_titlecontainer_title">
          Portfolio Value
        </div>
        <div className="tokenpricegraphcontainer_titlecontainer_tokensreleased">
          <div className="tokenpricegraphcontainer_titlecontainer_tokensreleased_value">
            {96} {"$"}
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
