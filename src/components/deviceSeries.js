import React from "react";
import DeviceTable from "./DeviceTable";
import styled from "styled-components";

const SeriesContainer = styled.div`
  margin-bottom: 30px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: white;
  background-color: #2a2a2a;
`;

const SeriesTitle = styled.h2`
  font-size: 48px;
  font-weight: 600;
  text-align: center;
  color: #fff;
`;

function DeviceSeries({ series }) {
  return (
    <SeriesContainer>
      <SeriesTitle>{series.series}</SeriesTitle>
      <DeviceTable devices={series.devices} />
    </SeriesContainer>
  );
}

export default DeviceSeries;