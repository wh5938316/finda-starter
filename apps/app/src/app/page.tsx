import Box from "@mui/material/Box";
import Button from "@mui/lab/LoadingButton";

export default function Home() {
  return (
    <Box>
      <Button variant="contained">Click me</Button>
      <Button variant="contained" loading>Click me</Button>
    </Box>
  );
}
