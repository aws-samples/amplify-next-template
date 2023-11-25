export interface Props extends React.HTMLAttributes<HTMLDivElement> {
    // other props for this component
}

export interface PhotoSliderProps {
    interval: number;
    hegit: string;
}

export interface PrivacyItemProps {
    title: string;
    desc: string;
    mt: string;
    mb: string;
    titlebold: boolean;
    titlefsize: string;
    descfsize: string;
    leading: string;
}