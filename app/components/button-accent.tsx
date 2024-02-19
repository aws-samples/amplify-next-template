import Button, { ButtonProps } from "@mui/material/Button";
import styled from "@mui/material/styles/styled";

export default function ButtonAccent(props: any) {
    return (
        <Button  variant="contained" color="secondary">{props.text}</Button>
    );
}