import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useProfileGet } from "../../hooks/useProfile.query";
import { useWalletGet } from "../../hooks/useWallet.query";
import { formatCurrency } from "../../Helpers/moneyFormat";

const MainHeader = () => {
  const [showAmounts, setShowAmounts] = useState(true);
  const { data: profileData } = useProfileGet();
  const { data: walletData } = useWalletGet();

  const handleShowAmount = () => {
    setShowAmounts(!showAmounts);
  };

  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        color: "white",
        position: "relative",
        zIndex: 1,
        left: 0,
      }}
    >
      {/* Logo */}
      {/* <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(45deg, #4a90e2, #357abd)",
              borderRadius: "8px",
              marginRight: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ fontSize: "20px", color: "white", fontWeight: "bold" }}>M</div>
          </div>
          <div>
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>Monaco Bank</div>
            <div style={{ fontSize: "12px", opacity: 0.8 }}>TRUST CAPITAL</div>
          </div>
        </div>
      </div> */}

      {/* Welcome and User Info */}
      <div style={{ textAlign: "left", marginBottom: "30px" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>
          Bem vindo
        </div>
        <div style={{ fontSize: "18px", marginBottom: "5px" }}>
          {profileData?.profile?.name || "Bianca Mariah Corte Real"}
        </div>
        <div style={{ fontSize: "15px", opacity: 0.8 }}>
          {profileData?.profile?.account_number || "87206228-2"}
        </div>
      </div>

      {/* Account Balance */}
      <div style={{ textAlign: "left" }}>
        <div style={{ display: "flex", justifyContent: "left", alignItems: "center", marginBottom: "10px" }}>
          <span style={{ fontSize: "16px", marginRight: "10px" }}>Valor em conta</span>
          <div onClick={handleShowAmount} style={{ cursor: "pointer" }}>
            {showAmounts ? <EyeInvisibleOutlined /> : <EyeOutlined />}
          </div>
        </div>
        <div style={{ fontSize: "18px", fontWeight: "bold" }}>
          {showAmounts
            ? formatCurrency(walletData?.amount || 500000, "USD")
            : "*********"}
        </div>
      </div>
    </div>
  );
};

export default MainHeader; 