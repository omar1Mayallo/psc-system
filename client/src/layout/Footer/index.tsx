import {Stack, Box, Container, Typography, Divider} from "@mui/material";
import {
  Phone,
  Facebook,
  Twitter,
  LocationOn,
  Instagram,
} from "@mui/icons-material";
import LogoText from "../../shared/components/LogoText";

export default function Footer() {
  return (
    <Box component="footer" borderTop={`1px solid #5a5a5a6b`}>
      <Container maxWidth="lg" sx={{py: 2}}>
        <Stack
          direction={"column"}
          spacing={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {/* PSC_INFO */}
          <LogoText />
          {/* SOCIAL */}
          <Stack direction="row" spacing={2}>
            <Facebook
              sx={{color: "#3b5998", fontSize: 30, cursor: "pointer"}}
            />
            <Twitter sx={{color: "#1da1f2", fontSize: 30, cursor: "pointer"}} />
            <Instagram
              sx={{color: "#c32aa3", fontSize: 30, cursor: "pointer"}}
            />
          </Stack>
          <Typography textAlign={"center"} color={"GrayText"}>
            This PlayStation Center Management System is designed to efficiently
            manage devices, snacks orders, and gaming sessions. With this
            comprehensive system, you can easily organize and track the usage of
            PlayStation devices, handle snack orders, and facilitate gaming
            sessions. Streamline your center's operations and provide a seamless
            gaming experience for your customers. Explore our innovative
            management solution today.
          </Typography>

          {/* LOCATION & PHONE */}
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              <Phone />
              <span>+20 012 013 987 12</span>
            </Box>
            <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
              <LocationOn />
              <address>123 Main Street, City, Country</address>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
