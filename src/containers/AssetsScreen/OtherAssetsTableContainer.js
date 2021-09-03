import "./AssetsScreen.scss";
import Table from "rc-table";
import Column from "rc-table";
import useWindowSize from "../../utils/windowSize";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
function OtherAssetsTableContainer({ projectOverviewData, projectDisplayID }) {
  const [allocationTableDetails, setAllocationTableDetails] = useState([
    { sr_no: "01", name: "Kalam", pricetz: "0.103", priceusd: "0.8704" },
    { sr_no: "02", name: "Kolibri", pricetz: "0.529", priceusd: "2.6189" },
  ]);
  const size = useWindowSize();
  const [displayWidth, setDisplayWidth] = useState(size.width);
  useEffect(() => {
    setDisplayWidth(size.width);
  }, [size]);
  return (
    <section className="otherassetstablecontainer">
      <div className="otherassetstablecontainer_title">All Assets</div>

      <Table
        data={allocationTableDetails}
        pagination={false}
        scroll={{ y: 280 }}
      >
        <Column
          title="Sr.No"
          dataIndex="sr_no"
          key="sr_no"
          width={displayWidth < 768 ? `15%` : `10%`}
          align="center"
        />
        <Column
          title="Name"
          dataIndex="name"
          key="name"
          width={
            displayWidth < 1280 && displayWidth > 767
              ? `25%`
              : displayWidth < 768
              ? "35%"
              : `35%`
          }
          align="left"
          render={(text) => {
            if (displayWidth > 1280) return <div>{text}</div>;
            else if (displayWidth > 767)
              return <div>{`${text.substr(0, 6)}...${text.substr(-4)}`}</div>;
            else
              return <div>{`${text.substr(0, 4)}...${text.substr(-4)}`}</div>;
          }}
        />
        <Column
          title="Price(ꜩ)"
          dataIndex={displayWidth < 1280 ? `pricetz` : "pricetz"}
          align="center"
          width={displayWidth < 1280 && displayWidth > 767 ? `25%` : `20%`}
          key="date"
        />
        <Column
          title="Price(USD)"
          dataIndex="priceusd"
          key="amount"
          align="center"
          className="text-green"
        />
      </Table>
    </section>
  );
}

export default OtherAssetsTableContainer;
