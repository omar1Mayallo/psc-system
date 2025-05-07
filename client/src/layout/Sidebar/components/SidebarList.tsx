import {Skeleton, Stack} from "@mui/material";
import List from "@mui/material/List";
import generateArrOfNum from "../../../shared/helpers/generateArrOfNum";
import useUserRole from "../../../shared/hooks/useUserRole";
import {navItems} from "../data";
import NavListItem from "./NavListItem";

function SideListSkeleton() {
  return (
    <Stack spacing={1} p={2}>
      {generateArrOfNum(4).map((item) => (
        <Skeleton variant="rounded" width="100%" height={40} key={item} />
      ))}
    </Stack>
  );
}

export default function SidebarList() {
  const {userRole} = useUserRole();
  const CheckAuthorization = (isAuthorizedTo: string | string[]) => {
    if (userRole) {
      // if arr
      if (Array.isArray(isAuthorizedTo)) {
        return isAuthorizedTo.includes(userRole);
      } else {
        return isAuthorizedTo === userRole;
      }
    }
    return true;
  };

  return (
    <List>
      {!userRole ? (
        <SideListSkeleton />
      ) : (
        navItems.map(({navItem, navUrl, NavIcon, isAuthorizedTo}, idx) => {
          let isNavItemAppear = true;
          if (isAuthorizedTo) {
            isNavItemAppear = CheckAuthorization(isAuthorizedTo);
          }

          return (
            isNavItemAppear && (
              <NavListItem
                key={idx}
                navItem={navItem}
                navUrl={navUrl}
                NavIcon={NavIcon}
              />
            )
          );
        })
      )}
    </List>
  );
}
