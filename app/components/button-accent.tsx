import Button, { ButtonProps } from "@mui/material/Button";
import styled from "@mui/material/styles/styled";

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.dark,
    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
    },
}));

export default function ButtonAccent(props: any) {
    return (
        <ColorButton variant="contained">{props.text}</ColorButton>
    );
}