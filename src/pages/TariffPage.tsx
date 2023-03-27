import { useEffect, useState, useRef } from "react";
import TariffTable from "../components/tarrif-table/TariffTable";
import { fetchPlans, ProductPlan } from "../api/api";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { Typography } from "@mui/material";

const options = [
  "Name (A-Z)",
  "Name (Z-A)",
  "Price (Asc)",
  "Price (Desc)",
  "Download (Asc)",
  "Download (Desc)",
  "Upload (Asc)",
  "Upload (Desc)",
];

function TariffPage() {
  let [plans, setPlans] = useState<ProductPlan[]>([]);

  useEffect(() => {
    fetchPlans("tariffName", "asc").then((data) => {
      setPlans(data);
    });
  }, []);

  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = async (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    // console.log(index);
    // console.log(event)
    if (index === 0) {
      let data = await fetchPlans("tariffName", "asc");
      setPlans(data)
    } else if (index === 1) {
      let data = await fetchPlans("tariffName", "desc");
      setPlans(data)
    } else if (index === 2) {
      let data = await fetchPlans("price", "asc");
      setPlans(data)
    } else if (index === 3) {
      let data = await fetchPlans("price", "desc");
      setPlans(data)
    } else if (index === 4) {
      let data = await fetchPlans("downloadSpeed", "asc");
      setPlans(data)
    } else if (index === 5) {
      let data = await fetchPlans("downloadSpeed", "desc");
      setPlans(data)
    } else if (index === 6) {
      let data = await fetchPlans("uploadSpeed", "asc");
      setPlans(data)
    } else if (index === 7) {
      let data = await fetchPlans("uploadSpeed", "desc");
      setPlans(data)
    }
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <div className="sort">
        <Typography>Sort Here:</Typography>
        &nbsp;
        <ButtonGroup
          variant="contained"
          size="small"
          ref={anchorRef}
          aria-label="split button"
        >
          <Button className="sort-btn" onClick={handleClick}>
            {options[selectedIndex]}
          </Button>
          <Button
            className="sort-btn"
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
      <TariffTable plans={plans} />
    </>
  );
}

export default TariffPage;
