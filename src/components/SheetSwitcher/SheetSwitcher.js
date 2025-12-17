// src/components/SheetSwitcher.js
import React from "react";
import styled from "styled-components";

const SheetSwitcher = ({ currentSheet, onSwitch }) => {
  return (
    <StyledWrapper>
      <div className="tab-container">
        {/* Sheet 1 */}
        <input
          type="radio"
          name="tab"
          id="sheet1"
          className="tab tab--1"
          checked={currentSheet === "sheet1"}
          onChange={() => onSwitch("sheet1")}
        />
        <label className="tab_label" htmlFor="sheet1">PrepSheets</label>

        {/* Sheet 2 */}
        <input
          type="radio"
          name="tab"
          id="sheet2"
          className="tab tab--2"
          checked={currentSheet === "sheet2"}
          onChange={() => onSwitch("sheet2")}
        />
        <label className="tab_label" htmlFor="sheet2">🚀 Striver’s SDE Sheet</label>

       

        <div className="indicator" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;

  .tab-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 4px;
    background: linear-gradient(135deg, #ff6b6b, #f7b733);
    border-radius: 12px;
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  }

  .indicator {
    content: "";
    width: 150px;
    height: 40px;
    background: #ffffff;
    position: absolute;
    top: 4px;
    left: 4px;
    z-index: 9;
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0px 4px 12px rgba(255, 107, 107, 0.35);
  }

  .tab {
    width: 150px;
    height: 40px;
    position: absolute;
    z-index: 99;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }

  .tab_label {
    width: 150px;
    height: 40px;
    position: relative;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.7;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s, opacity 0.3s;
    user-select: none;
  }

  .tab_label:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  .tab:checked + .tab_label {
    opacity: 1;
    font-weight: 700;
    color: #ff6b6b;
  }

  .tab--1:checked ~ .indicator {
    left: 4px;
  }

  .tab--2:checked ~ .indicator {
    left: calc(150px + 4px);
  }

  .tab--3:checked ~ .indicator {
    left: calc(150px * 2 + 4px);
  }
`;

export default SheetSwitcher;
