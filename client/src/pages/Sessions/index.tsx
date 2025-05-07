import DeleteIcon from "@mui/icons-material/Delete";
import {Alert, Box, Button, CircularProgress, Grid} from "@mui/material";
import GridListSkeleton from "../../shared/components/Loader/GridSkeleton";
import useUserRole from "../../shared/hooks/useUserRole";
import SessionItem from "./components/SessionItem";
import useDeleteAllSessions from "./services/deleteAllSessions";
import useGetAllSessions from "./services/getAllSessions";
import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Sessions() {
  const {isOwner} = useUserRole();
  // HANDLE_GET_ALL_ORDERS
  const {data, isLoading, isError, error, fetchNextPage, hasNextPage} =
    useGetAllSessions();

  const dataExist = data && data?.pages[0].data.docs.length > 0;

  const fetchedGamesCount =
    data?.pages.reduce((total, page) => total + page.data.docs.length, 0) || 0;

  console.log(fetchedGamesCount);

  // HANDLE_DELETE_ALL_Sessions
  const {mutate, isLoading: isDeleteLoading} = useDeleteAllSessions();

  if (isError) {
    return (
      <Alert variant="filled" color="error">
        {error?.message}
      </Alert>
    );
  }

  return (
    <Box component={"section"}>
      {/* DELETE_ALL */}
      {isOwner && dataExist && (
        <Box textAlign={"end"} mb={2}>
          <Button
            variant="outlined"
            color="error"
            disabled={isDeleteLoading}
            startIcon={
              isDeleteLoading ? (
                <CircularProgress color="inherit" size={15} />
              ) : (
                <DeleteIcon />
              )
            }
            sx={{ml: 1}}
            onClick={() => mutate()}
          >
            {isDeleteLoading ? "Deleting" : "Delete All"}
          </Button>
        </Box>
      )}
      {/* SESSIONS */}

      {isLoading ? (
        <Grid container spacing={2}>
          <GridListSkeleton numOfItems={3} xs={12} sm={6} lg={4} />
        </Grid>
      ) : dataExist ? (
        <InfiniteScroll
          dataLength={fetchedGamesCount}
          hasMore={!!hasNextPage}
          next={() => fetchNextPage()}
          loader={
            <Box textAlign={"center"}>
              <CircularProgress sx={{my: 2}} />
            </Box>
          }
        >
          <Grid container spacing={2}>
            {data.pages.map((pgContent, idx) => (
              <React.Fragment key={idx}>
                {pgContent.data.docs.map((item, idx) => (
                  <Grid item xs={12} sm={6} lg={4} key={idx}>
                    <SessionItem item={item} />
                  </Grid>
                ))}
              </React.Fragment>
            ))}
          </Grid>
        </InfiniteScroll>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Alert variant="outlined" color="warning" severity="info">
              No Sessions Added Yet
            </Alert>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
