/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import { Card, LinearProgress, Stack } from "@mui/material";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import linearGradient from "assets/theme/functions/linearGradient";

// Vision UI Dashboard React base styles
import typography from "assets/theme/base/typography";
import colors from "assets/theme/base/colors";

// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";

// React icons
import { IoIosRocket } from "react-icons/io";
import { IoGlobe } from "react-icons/io5";
import { IoBuild } from "react-icons/io5";
import { IoWallet } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import { IoSpeedometerSharp } from "react-icons/io5";
import { PiWindBold } from "react-icons/pi";
import { GiSparkles } from "react-icons/gi";
import { MdBrightnessMedium } from "react-icons/md";
import { TbArrowsMove } from "react-icons/tb";
import { IoPaw } from "react-icons/io5";
import { RiWaterPercentFill } from "react-icons/ri";



// Data
import LineChart from "examples/Charts/LineCharts/LineChart";
import BarChart from "examples/Charts/BarCharts/BarChart";
import { lineChartDataDashboard } from "layouts/dashboard/data/lineChartData";
import { lineChartOptionsDashboard } from "layouts/dashboard/data/lineChartOptions";
import { barChartDataDashboard } from "layouts/dashboard/data/barChartData";
import { barChartOptionsDashboard } from "layouts/dashboard/data/barChartOptions";



// const { ipcRenderer } = window.require('electron');
import { useEffect, useState, useRef } from "react";

function getEpochFromLong(longObj) {
  // const combinedEpoch = (BigInt.asUintN(32,longObj.high) << 32n)| BigInt.asUintN(32, longObj.low);

  // // Ensure longObj has high and low properties
  // if (typeof longObj !== "object" || longObj === null || typeof longObj.high === 'undefined' || typeof longObj.low === 'undefined') {
  //   throw new Error("Invalid long object");
  // }

  // // Convert high and low to BigInt, if they aren't already
  // const highBigInt = (typeof longObj.high === 'bigint') ? longObj.high : BigInt(longObj.high);
  // const lowBigInt = (typeof longObj.low === 'bigint') ? longObj.low : BigInt(longObj.low);

  // // Ensure high and low are valid 32-bit unsigned integers
  // if (lowBigInt < 0n) {
  //   throw new Error(" Low should be unsigned 32-bit integers");
  // }

  // if (highBigInt < 0n || highBigInt > 0xFFFFFFFFn ) {
  //   throw new Error("Low should be unsigned 32-bit integers");
  // }


  // Combine the high and low parts into a single BigInt
  // const combinedEpoch = (BigInt.asUintN(32, highBigInt) << 32n) | BigInt.asUintN(32, lowBigInt);

  // const packetEpochInMs = Number(combinedEpoch) * 1000; 

  // const newDate = new Date(packetEpochInMs);
  // console.log("new date in getEpoch ", newDate)

  // Assuming long is an object with `low` and `high` properties
  // const low = longObj.low >>> 0; // Convert to unsigned
  // const high = longObj.high >>> 0; // Convert to unsigned
  
  // Combine them into a single unsigned integer
  // const result = (longObj.high * 0x100000000) + longObj.low;

  // const low = longObj.low < 0 ? longObj.low + 0x100000000 : longObj.low; // Convert low to unsigned if negative
  // const result = (longObj.high * 0x100000000) + low; // Combine high and low
  // return result;
  // return Number((BigInt(412) << 32n) + BigInt(1715405636));

  // const low = longObj.low < 0 ? longObj.low + 0x100000000 : longObj.low; // Convert negative low to unsigned
  // const high = longObj.high >>> 0; // Ensure high is unsigned

  // // Combine high and low to get the epoch timestamp
  // const epochTimestamp = (BigInt(high) << 32n) + BigInt(low);
  // console.log("epochTimestamp ", epochTimestamp)
  // console.log("Number(epochTimestamp) :, ", Number(epochTimestamp))

  // return Number(epochTimestamp);
  const low = BigInt.asUintN(32, BigInt(longObj.low));
  const high = BigInt.asUintN(32, BigInt(longObj.high));
  var combined = (high << 32n) | low;
  var combinedBigInt = BigInt.asUintN(64, combined);
  console.log("combinedBigInt ", combinedBigInt)
  return combinedBigInt;
  
}

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;

  const [currentPacket, setCurrentPacket] = useState(null);
  const [temperatureLineChartData, setTemperatureLineChartData] = useState([]);

  // Use ref to store the latest temperatureLineChartData
  const temperatureDataRef = useRef(temperatureLineChartData);

  // useEffect(() => {
  //   if (window.electron && window.electron.ipcRenderer) {
  //     window.electron.ipcRenderer.invoke('getCurrentPacket').then(setCurrentPacket);
  //   } else {
  //     console.error("ipcRenderer is not available.");
  //   }
  // }, []);

  // Update ref whenever temperatureLineChartData state changes
  useEffect(() => {
    temperatureDataRef.current = temperatureLineChartData;
  }, [temperatureLineChartData]);

  // useEffect(() => {
  //   if (window.electron && window.electron.ipcRenderer) {
  //     window.electron.ipcRenderer.on('packet-updated', (event, packet) => {
  //       console.log("packet updated on frontend");
  //       setCurrentPacket(packet);
  
  //       const packetEpochInMs = Number(getEpochFromLong(packet.header.epoch)) * 1000;
  //       const newTemp = packet.systemInfoPacket.simpleSensorReading.temperature;
  
  //       // Update the chart data directly
  //       setTemperatureLineChartData((prevData) => [
  //         ...prevData, 
  //         [packetEpochInMs, newTemp]
  //       ]);
  //     });
  
  //     // Cleanup the event listener when the component unmounts
  //     return () => {
  //       window.electron.ipcRenderer.removeAllListeners('packet-updated');
  //     };
  //   } else {
  //     console.error("ipcRenderer is not available.");
  //   }
  // }, []);
  

  useEffect(() => {
    if (window.electron && window.electron.ipcRenderer) {
      // Listen for the packet-updated event
      window.electron.ipcRenderer.on('packet-updated', (event, packet) => {
        console.log("packet updated on frontend")
        setCurrentPacket(packet);

        // update the temperature array
        // const packetEpoch = getEpochFromLong(packet.header.epoch); // Or some method to deserialize Long
        // const newDate = new Date(packetEpoch * 1000n); // If epoch is in seconds, multiply by 1000
        // const newDateSec = new Date(packetEpoch); // If epoch is in seconds, multiply by 1000

        // Get the epoch time from the packet
        const packetEpochBigInt = getEpochFromLong(packet.header.epoch); 

        // Convert the BigInt to a Number (if the epoch is in seconds)
        const packetEpochInMs = Number(packetEpochBigInt) * 1000; 

        // Create Date object
        const newDate = new Date(packetEpochInMs);

        console.log("packetEpoch (BigInt): ", packetEpochBigInt);
        console.log("packetEpochInMs ", packetEpochInMs);
        console.log("newDate (Milliseconds): ", newDate);
        console.log("newDate (seconds): ", new Date(Number(packetEpochBigInt)));



        const newTemp = packet.systemInfoPacket.simpleSensorReading.temperature
        // console.log("packetEpoch ", packetEpoch)
        // console.log("newDate ", newDate)
        // console.log("newDateSec ", newDateSec)
        // console.log("new Date(packet.header.epoch * 1000) ", new Date(packet.header.epoch * 1000n))


        console.log("newTemp ", newTemp)
        // setTemperatureLineChartData((prevData) => [...prevData, [0, 1]]);

        // Update state using ref to always reference the latest array
        setTemperatureLineChartData([...temperatureDataRef.current, [Number(packetEpochBigInt), newTemp]]);
        console.log("temperatureLineChartData, ", temperatureLineChartData)

      });

    

      // useEffect(() => {
      //   console.log("Updated temperatureLineChartData: ", temperatureLineChartData);
      // }, [temperatureLineChartData]);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.electron.ipcRenderer.removeAllListeners('packet-updated');
      };
    } else {
      console.error("ipcRenderer is not available.");
    }
  }, []);

  // Log updated temperature data
  useEffect(() => {
    console.log("Updated temperatureLineChartData: ", temperatureLineChartData);
  }, [temperatureLineChartData]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "temperature", fontWeight: "regular" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.temperature.toFixed(4) : "N/A"
                }
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <FaTemperatureHalf size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "humidity" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.humidity.toFixed(4) : "N/A"
                }
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <RiWaterPercentFill size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "pressure" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.pressure.toFixed(4) : "N/A"
                }
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoSpeedometerSharp size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "gas" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.gas.toFixed(4) : "N/A"
                }
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <PiWindBold size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Particulate Matter", fontWeight: "regular" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.pm2_5.toFixed(4) : "N/A"
                }
                percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: <GiSparkles size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Light" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.light : "N/A"
                }
                percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: <MdBrightnessMedium size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Activity" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.activity : "N/A"
                }
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <TbArrowsMove size="20px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Steps" }}
                count={currentPacket ?
                  currentPacket.systemInfoPacket.simpleSensorReading.steps : "N/A"
                }
                percentage={{ color: "success", text: "+5%" }}
                icon={{ color: "info", component: <IoPaw size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
            <Grid item xs={12} lg={6} xl={3}>
              <SatisfactionRate value={currentPacket && currentPacket.systemInfoPacket.sdCardState ? currentPacket.systemInfoPacket.sdCardState.spaceRemaining : "N/A"}/>
            </Grid>
            <Grid item xs={12} lg={6} xl={4}>
              <ReferralTracking charging={currentPacket ? currentPacket.systemInfoPacket.batteryState.charging : "N/A"} 
                voltage={currentPacket ? currentPacket.systemInfoPacket.batteryState.voltage : "N/A"}
                percentage={currentPacket ? currentPacket.systemInfoPacket.batteryState.percentage : "N/A"
                }/>
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} xl={7}>
              <Card>
                <VuiBox sx={{ height: "100%" }}>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Temperature Overview
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      +5% more{" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        in 2021 [Edit]
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ height: "310px" }}>
                  {/* <LineChart
                    lineChartData={temperatureLineChartData.length > 0 
                      ? [{ name: "Temperature", data: temperatureLineChartData }] 
                      : [{ name: "Temperature", data: [] }]
                    }
                    lineChartOptions={lineChartOptionsDashboard}
                  /> */}
                  <LineChart
                    lineChartData={temperatureLineChartData.length > 0 
                      ? [{name: "Temperature", data: temperatureLineChartData}] 
                      : [{name: "Temperature", data: temperatureLineChartData }]
                    }
                    lineChartOptions={lineChartOptionsDashboard}
                  />
                  </VuiBox>
                </VuiBox>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6} xl={5}>
              <Card>
                <VuiBox>
                  <VuiBox
                    mb="24px"
                    height="220px"
                    sx={{
                      background: linearGradient(
                        cardContent.main,
                        cardContent.state,
                        cardContent.deg
                      ),
                      borderRadius: "20px",
                    }}
                  >
                    <BarChart
                      barChartData={barChartDataDashboard}
                      barChartOptions={barChartOptionsDashboard}
                    />
                  </VuiBox>
                  <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">
                    Active Users
                  </VuiTypography>
                  <VuiBox display="flex" alignItems="center" mb="40px">
                    <VuiTypography variant="button" color="success" fontWeight="bold">
                      (+23){" "}
                      <VuiTypography variant="button" color="text" fontWeight="regular">
                        than last week
                      </VuiTypography>
                    </VuiTypography>
                  </VuiBox>
                  <Grid container spacing="50px">
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoWallet color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Users
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        32,984
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoIosRocket color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Clicks
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,42M
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <FaShoppingCart color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Sales
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        2,400$
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <Stack
                        direction="row"
                        spacing={{ sm: "10px", xl: "4px", xxl: "10px" }}
                        mb="6px"
                      >
                        <VuiBox
                          bgColor="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          sx={{ borderRadius: "6px", width: "25px", height: "25px" }}
                        >
                          <IoBuild color="#fff" size="12px" />
                        </VuiBox>
                        <VuiTypography color="text" variant="button" fontWeight="medium">
                          Items
                        </VuiTypography>
                      </Stack>
                      <VuiTypography color="white" variant="lg" fontWeight="bold" mb="8px">
                        320
                      </VuiTypography>
                      <VuiProgress value={60} color="info" sx={{ background: "#2D2E5F" }} />
                    </Grid>
                  </Grid>
                </VuiBox>
              </Card>
            </Grid>
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
