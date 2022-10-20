import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import BasicSettings from "./BasicSettings";
import PasswordSettings from "./PasswordSettings";
import ProfileSettings from "./ProfileSettings";

const AccountSettings = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <BasicSettings handleChange={handleChange} expanded={expanded} />
      <ProfileSettings handleChange={handleChange} expanded={expanded} />
      <PasswordSettings handleChange={handleChange} expanded={expanded} />
    </div>
  );
};

export default AccountSettings;
