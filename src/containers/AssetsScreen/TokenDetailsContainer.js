import "./AssetsScreen.scss";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function TokenDetailsContainer({ projectOverviewData, projectDisplayID }) {
  // useEffect(() => {
  //   displayProjectDetails();
  // }, [projectDisplayID, projectOverviewData])
  const [project, setProject] = useState({
    projectName: "Tezos",
    tokenTicker: "8 USD",
    derivativeID: "1 ꜩ",
    contractAddress: "40 ꜩ",
    projectDescription: "4000 ꜩ",
  });
  // const displayProjectDetails=async()=>{
  //   if(projectOverviewData){
  //   let description = "To the moon!";
  //   let currentProject=projectOverviewData[projectDisplayID];
  //         try {
  //           const res = await fetch(
  //             `https://milliondollarhomepage.mypinata.cloud/ipfs/${currentProject.projectDocHash}`
  //           );
  //           const desc = await res.json();
  //           description = desc.description;
  //         } catch (error) {
  //           console.log(error);
  //         }
  //         setProject({
  //           projectName:currentProject.projectName,
  //           tokenTicker:currentProject.projectTokenTicker,
  //           contractAddress:currentProject.projectTokenAddress,
  //           projectDescription:description
  //         })
  //       }
  // }
  return (
    <section className="tokendetailscontainer">
      <div className="tokendetailscontainer_title">DETAILS</div>
      <hr className="border-dark-200 px-2 h-2"></hr>
      <div className="tokendetailscontainer_innercontainer">
        <div className="flex justify-between">
          <div className="tokendetailscontainer_innercontainer_detailbox">
            <div className="tokendetailscontainer_innercontainer_detailbox_key">
              Token Name
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {project.projectName}
            </div>
          </div>
          <div className="tokendetailscontainer_innercontainer_detailbox">
            <div className="tokendetailscontainer_innercontainer_detailbox_key">
              USD Value
            </div>
            <div className="tokendetailscontainer_innercontainer_detailbox_value">
              {project.tokenTicker}
            </div>
          </div>
        </div>
        <div className="tokendetailscontainer_innercontainer_detailbox">
          <div className="tokendetailscontainer_innercontainer_detailbox_key">
            TZ Value
          </div>
          <div className="tokendetailscontainer_innercontainer_detailbox_value">
            {project.contractAddress}
          </div>
        </div>
        <div className="tokendetailscontainer_innercontainer_detailbox">
          <div className="tokendetailscontainer_innercontainer_detailbox_key">
            LP TVL
          </div>
          <div className="tokendetailscontainer_innercontainer_detailbox_value">
            {project.projectDescription}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TokenDetailsContainer;
