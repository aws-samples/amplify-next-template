import { Url } from "next/dist/shared/lib/router/router";
import GodGridItem from "./GodGridItem";

export interface GodsListProps {
    gods: Array<{godName: string, imageUrl: string, godTitle: string}>
}

export default function GodsList(props: GodsListProps){
    return(
        <span className="flex flex-wrap items-center">
            {(Array.isArray(props.gods) && props.gods.length > 0) && props.gods.map(god => 
            <GodGridItem
                godName={god.godName}
                imageUrl={god.imageUrl}
                godTitle={god.godTitle}
            />
            )}
        </span>
    )
}