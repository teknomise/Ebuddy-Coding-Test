"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, TextField, Box, Typography, CircularProgress, Paper } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/apis/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const login = await signInWithEmailAndPassword(auth, email, password);
      console.log(login)
      document.cookie = `authToken=true; path=/`;
      router.push("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f5"
      px={2}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom textAlign="center">
          Login
        </Typography>

        {error && (
          <Typography
            color="error"
            variant="body2"
            sx={{ mb: 2 }}
            aria-live="assertive"
            textAlign="center"
          >
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="email"
          required
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          autoComplete="current-password"
          required
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          disabled={isLoading}
          fullWidth
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Login"}
        </Button>
      </Paper>
    </Box>
  );
}
