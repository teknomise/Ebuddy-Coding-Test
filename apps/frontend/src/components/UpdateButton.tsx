"use client";

import React, { useState } from "react";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import { fetchUserData, updateUserData } from "@/apis/userApi";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";

const UpdateButton = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state: RootState) => state.user);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleFetchUser = async () => {
    dispatch(setLoading(true));
    setLocalError(null);
    try {
      const userData = await fetchUserData("user-id");
      dispatch(setUser(userData));
      alert(`Fetched User: ${JSON.stringify(userData)}`);
    } catch (error) {
      const errorMessage = (error as Error).message || "Failed to fetch user data";
      setLocalError(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateUser = async () => {
    dispatch(setLoading(true));
    setLocalError(null);
    try {
      const updatedUser = await updateUserData("user-id", { name: "Updated Name" });
      dispatch(setUser(updatedUser));
      alert(`Updated User: ${JSON.stringify(updatedUser)}`);
    } catch (error) {
      const errorMessage = (error as Error).message || "Failed to update user data";
      setLocalError(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {localError && (
        <Typography color="error" sx={{ mb: 2 }}>
          {localError}
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleFetchUser}
        disabled={isLoading}
        startIcon={isLoading && <CircularProgress size={20} />}
      >
        Fetch User Data
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleUpdateUser}
        sx={{ ml: 2 }}
        disabled={isLoading || !user}
        startIcon={isLoading && <CircularProgress size={20} />}
      >
        Update User Data
      </Button>
    </Box>
  );
};

export default UpdateButton;
