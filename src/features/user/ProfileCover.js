import { Avatar, Box, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

function ProfileCover() {
  const user = useAuth();

  const { shopName, logoUrl } = user.user;

  return (
    <Box sx={{ position: "absolute" }}>
      <Avatar
        src={logoUrl}
        alt={shopName}
        sx={{
          mx: "auto",
          borderWidth: 2,
          borderStyle: "solid",
          borderColor: "common.white",
          width: { xs: 50, md: 115 },
          height: { xs: 50, md: 115 },
          position: "absolute",
          top: { xs: 50, md: 140 },
          left: { xs: 25, md: 40 },
          zIndex: 3,
        }}
      />
      <Box
        sx={{
          ml: { md: 3 },
          mt: { xs: 1, md: 0 },
          position: "absolute",
          zIndex: 4,
          top: { xs: 60, md: 185 },
          left: { xs: 80, md: 140 },
        }}
      >
        <Typography sx={{ fontSize: { xs: 13, md: 22 }, fontWeight: 600 }}>
          {shopName}
        </Typography>
      </Box>

      <Box sx={{ zIndex: 1 }}>
        <img
          src="https://res.cloudinary.com/drvcdh4cx/image/upload/v1664599016/foods-store/yqah7d8fbglxrrldxlzl.jpg"
          alt=""
          width="100%"
          height="100%"
        />
      </Box>
    </Box>
  );
}

export default ProfileCover;
