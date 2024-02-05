import Image from "next/image";

export interface GodGridItemProps{
    godName: string;
    imageUrl: string;
    godTitle: string;
}

export default function GodGridItem(props: GodGridItemProps){
    return(
        <div className="border-solid border-2 border-zinc-600 w-48 h-80 mx-4 my-4 flex flex-col justify-between">
            <span className="text-center text-xl">
                {props.godName}
            </span>
            <span className="text-center text-sm">
                {props.godTitle}
            </span>
            <Image
                src={props.imageUrl}
                alt={props.godName}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
            />
        </div>
    )
}