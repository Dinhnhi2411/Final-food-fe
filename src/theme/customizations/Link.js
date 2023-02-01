function Link(theme) {
    return {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          position: "relative",
          overflow: "hidden",
          "&::before": {
            position: "absolute",
            content: '""',
            opacity: 1,
            left: 0,
            bottom: 0,
            borderBottom: "2px solid",
            width: "0",
            borderColor: "inherit",

            transition: theme.transitions.create(["all"], {
              duration: theme.transitions.duration.standard,
            }),
          },
          "&:hover::before": {
            width: "100%",
            opacity: 1,
          },
        },
      },
    },
  };
  }
  
  export default Link;
