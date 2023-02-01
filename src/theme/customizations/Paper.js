export default function Paper(theme) {
  return {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },

      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: theme.shadows[1],
        },
      },
    },
  };
}
