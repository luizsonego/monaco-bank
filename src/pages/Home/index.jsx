import { Button, NavBar, Space, Toast } from "antd-mobile";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import { useTransactionsGet, useWalletGet } from "../../hooks/useWallet.query";
// import { Card, CardBody } from "@chakra-ui/react";
import Title from "antd/es/typography/Title";
import { Card, Divider, Flex, Statistic } from "antd";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { type_format, type_format_color } from "../../Helpers/typeFormat";
import { date_format } from "../../Helpers/dateFormat";
import HeaderProfile from "../../components/layout/HeaderProfile";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { SystemQRcodeOutline } from "antd-mobile-icons";
import Shortcuts from "../../components/Shortcuts";
import { useNavigate } from "react-router-dom";
import { HiArrowsRightLeft } from "react-icons/hi2";
import { IoIosBarcode } from "react-icons/io";
import { FaHandHoldingUsd } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Home = () => {
  const [showAmounts, setShowAmounts] = useState(true);
  const navigate = useNavigate();
  const { data: walletData, isLoading: loadingWallet } = useWalletGet();
  const { data: transactionsData, isLoading: loadingTransactions } =
    useTransactionsGet();

  const handleShowAmount = () => {
    setShowAmounts(!showAmounts);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <>
      {/* <div
        style={{
          background: "#081331",
          width: "100%",
          height: 350,
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 0,
        }}
      ></div> */}
      <HeaderProfile />

      <Card
        bordered={false}
        style={{ background: "#fff", marginBottom: 15, marginTop: 15 }}
      >
        <Card
          loading={loadingWallet}
          style={{ background: "#e6e6e6", maxHeight: 80 }}
        >
          <Flex justify={"space-between"}>
            <div>
              {showAmounts
                ? formatCurrency(walletData?.amount, "USD")
                : "*********"}
            </div>
            <div onClick={handleShowAmount}>
              {showAmounts ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </div>
          </Flex>
        </Card>
        <Button
          type="button"
          fill="outline"
          block
          style={{ marginTop: 15, height: 55 }}
          onClick={() => handleNavigate("investiment")}
        >
          Ver extrato
        </Button>
      </Card>

      <Card
        bordered={false}
        style={{ background: "#fff", marginBottom: 15, marginTop: 15 }}
      >
        <Flex justify={"space-between"}>
          <Title level={3}>Investimento</Title>
          expandir
        </Flex>
        <Flex justify={"space-between"} gap={10}>
          <Button
            type="button"
            fill="outline"
            block
            style={{ marginTop: 15, height: 55 }}
          >
            Ver
          </Button>
          <Button
            type="button"
            fill="outline"
            block
            style={{ marginTop: 15, height: 55 }}
          >
            Enviar
          </Button>
        </Flex>
      </Card>

      <Flex
        gap={10}
        wrap="wrap"
        style={{
          overflowX: "scroll",
        }}
      >
        <Shortcuts
          icon={<IoIosBarcode size={30} color="#ceb478" />}
          label={"Pagar"}
        />
        <Shortcuts
          icon={<HiArrowsRightLeft size={30} color="#ceb478" />}
          label={"Transferir"}
        />
        <Shortcuts
          icon={<FaHandHoldingUsd size={30} color="#ceb478" />}
          label={"Emprestimos"}
        />
        <Shortcuts
          icon={<HiOutlineDotsHorizontal size={30} color="#ceb478" />}
          label={"Todos"}
        />
      </Flex>
      <Divider />

      {/* <div>
        {transactionsData?.map((transaction) => (
          <Card
            bordered={false}
            loading={loadingTransactions}
            style={{ marginBottom: 10 }}
          >
            <span style={{ color: "#797777", fontSize: 12 }}>
              {date_format(transaction.date)}
            </span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 16, fontWeight: 500, color: "#555555" }}>
                {type_format(transaction.type_transaction)}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: type_format_color(transaction.type_transaction),
                }}
              >
                {showAmounts
                  ? formatCurrency(transaction.amount_money, "USD")
                  : "*********"}
              </span>
            </div>
          </Card>
        ))}
      </div> */}

      {/* <section>
        <div className="content-scroll-horiz">
          <ul>
            <li>
              <a href="#">
                <div className="foto">
                  <img
                    src="https://i.ibb.co/MkqbCCy/dog-2438803-960-720.png"
                    alt=""
                    title=""
                  />
                </div>
                <div>
                  <h3>
                    <span>Orión</span>
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="foto">
                  <img
                    src="https://i.ibb.co/SmkRLdY/isolated-2253208-960-720.png"
                    alt=""
                    title=""
                  />
                </div>
                <div>
                  <h3>
                    <span>Winter</span>
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="foto">
                  <img
                    src="https://i.ibb.co/4jfFhzv/golden-retriever-3760993-960-720.png"
                    alt=""
                    title=""
                  />
                </div>
                <div>
                  <h3>
                    <span>Azul</span>
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="foto">
                  <img
                    src="https://i.ibb.co/yPfGc5y/golden-retriever-3139491-960-720.png"
                    alt=""
                    title=""
                  />
                </div>
                <div>
                  <h3>
                    <span>Sabio</span>
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="foto">
                  <img
                    src="https://i.ibb.co/gmkdLwV/dog-3409531-960-720.png"
                    alt=""
                    title=""
                  />
                </div>
                <div>
                  <h3>
                    <span>Atila</span>
                  </h3>
                </div>
              </a>
            </li>

            <li>
              <a href="#">
                <div className="foto">
                  <img
                    src="https://i.ibb.co/Y4gnRZ1/isolated-1452903-960-720.png"
                    alt=""
                    title=""
                  />
                </div>
                <div>
                  <h3>
                    <span>Bob</span>
                  </h3>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </section> */}
    </>
  );
};

export default Home;
