import {Typography} from "@mui/material";

interface DateTextProps {
  date: string;
  preText?: string;
}
export default function DateText({date, preText}: DateTextProps) {
  const convertedDate = new Date(date).toLocaleDateString("en-US");

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{textAlign: "end", fontSize: "10px", fontStyle: "italic"}}
    >
      {preText} {convertedDate}
    </Typography>
  );
}
