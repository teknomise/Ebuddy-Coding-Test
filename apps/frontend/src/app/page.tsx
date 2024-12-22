"use client";

import { Box, Typography, Container } from "@mui/material";
import UpdateButton from "@/components/UpdateButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = document.cookie.includes("authToken=true");
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Main Page
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use the button below to fetch and update user data.
        </Typography>
        <UpdateButton />
      </Box>
    </Container>
  );
}
