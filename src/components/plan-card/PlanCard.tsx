import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";
import "./index.scss"; // index should be imported first
import { useMediaQuery } from "react-responsive";

function PlanCard(props: any) {

  const isDesktop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1024px",
  });
  
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
      <Card className="card">
        <div className="content">
          <Typography className="id-product">{props.plan.id}</Typography>
          <Typography className="tariff-name">
            {props.plan.tariffName}
          </Typography>
          <div className="tariff-details">
            <div className="tariff-detail">
              <Typography className="detail-name">Download</Typography>
              <div className="detail-field">
                <ArrowDownwardIcon className="field-icon" />
                <Typography className="field-text">
                  {props.plan.downloadSpeed} Mbit/s
                </Typography>
              </div>
            </div>
            {isTablet || isDesktop ? (
              <div className="tariff-detail">
                <Typography className="detail-name">Upload</Typography>
                <div className="detail-field">
                  <ArrowUpwardIcon className="field-icon" />
                  <Typography className="field-text">
                    {props.plan.uploadSpeed} Mbit/s
                  </Typography>
                </div>
              </div>
            ) : null}
          </div>
          {isDesktop ? (
            <ul className="tariff-benefits">
              {props.plan.benefits?.map((benefit: string) => (
                <li className="benefit-text">{benefit}</li>
              ))}
            </ul>
          ) : null}

          <div className="price">
            <Typography className="price-text">{props.plan.price} €</Typography>

            <Button size="small" className="tariff-btn">
              {isTablet || isDesktop ? (
                <p className="tariff-text">To Tariff</p>
              ) : null}
              <ArrowForwardIosIcon />
            </Button>
          </div>
        </div>
      </Card>
  );
}

export default PlanCard;
