import { useTheme } from '@graasp/ui';

import { Box, Typography } from '@mui/material';

const Footer = () => {
  const { languageSelect } = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="end"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      {languageSelect}
      <Typography variant="caption" color="darkgrey">
        © LNCO 2024 - {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
