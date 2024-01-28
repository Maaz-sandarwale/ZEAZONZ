import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Timelinechart from "./Timelinechart";
import ApexMultiSeriesChart from "./ApexMultiSeriesChart";

function App() {
  const [filter, setFilter] = useState("1 MONTH");

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button variant="outlined" sx={{ mr: "2%" }}>
              Today
            </Button>
            <Button variant="outlined" sx={{ mr: "2%" }}>
              <ArrowBackIosIcon />
            </Button>
            <Button variant="outlined" sx={{ mr: "2%" }}>
              <ArrowForwardIosIcon />
            </Button>
          </Typography>

          <Typography>
            <Button
              variant="outlined"
              sx={{ borderRadius: 0 }}
              onClick={() => setFilter("1 DAY")}
            >
              1 DAY
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 0 }}
              onClick={() => setFilter("2 DAY")}
            >
              2 DAY
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 0 }}
              onClick={() => setFilter("1 WEEK")}
            >
              1 WEEK
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 0 }}
              onClick={() => setFilter("2 WEEK")}
            >
              2 WEEK
            </Button>
            <Button
              variant="outlined"
              sx={{ borderRadius: 0 }}
              onClick={() => setFilter("1 MONTH")}
            >
              1 MONTH
            </Button>
          </Typography>
        </Toolbar>
        
        <ApexMultiSeriesChart Dataval={filter}/>
       

      </Box>
    </>
  );
}

export default App;
