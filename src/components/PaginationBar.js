import React from "react";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getBook, nextPagination } from "../app/Slice";
import { useDispatch } from "react-redux";

const PaginationBar = ({ pageNum, totalPageNum }) => {

  const dispatch = useDispatch()
  const handleChange = (event, value) => {
    dispatch(nextPagination(value))
    // console.log(event)
  };
  return (
    <Stack spacing={2}>
      <Pagination count={totalPageNum} page={pageNum} onChange={handleChange} showFirstButton showLastButton />
    </Stack>
  );
};

export default PaginationBar;
