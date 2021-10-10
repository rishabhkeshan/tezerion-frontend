import "./AssetsScreen.scss";
import Table from "rc-table";
import Column from "rc-table";
import useWindowSize from "../../utils/windowSize";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
const currentDate = new Date();
let datetime = currentDate.toLocaleString("en-US");
function OtherAssetsTableContainer({ tokenData }) {
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

      <Table data={tokenData.tokens} pagination={false} scroll={{ y: 280 }}>
        <Column
          title="Sr.No"
          dataIndex="contractAddress"
          key="sr_no"
          width={displayWidth < 768 ? `15%` : `10%`}
          align="center"
          render={(text) => {
            return <div>{text}</div>;
          }}
        />
        <Column
          title="Symbol"
          dataIndex="symbol"
          key="symbol"
          width={
            displayWidth < 1280 && displayWidth > 767
              ? `20%`
              : displayWidth < 768
              ? "25%"
              : `25%`
          }
          align="left"
          render={(text) => {
            return <div>{text}</div>;
          }}
        />
        <Column
          title="Price(USD)"
          dataIndex={displayWidth < 1280 ? `price` : "price"}
          align="center"
          width={displayWidth < 1280 && displayWidth > 767 ? `20%` : `15%`}
          key="price"
        />
        <Column
          title="Balance"
          dataIndex={"balance"}
          align="center"
          width={displayWidth < 1280 && displayWidth > 767 ? `20%` : `15%`}
          key="date"
        />
        <Column
          title="Value (USD)"
          dataIndex="usdValue"
          key="usdValue"
          align="center"
          className="text-green"
        />
      </Table>
    </section>
  );
}

export default OtherAssetsTableContainer;
