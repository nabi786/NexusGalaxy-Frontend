import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout";

const UpdateCollection = () => {
  const { id } = useParams();
  return (
    <Box>
      <Layout>
        <h1>Update Collection</h1>
      </Layout>
    </Box>
  );
};

export default UpdateCollection;
