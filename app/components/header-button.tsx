import { cn } from "@/lib/utils";

type Props = {
    title: string;
    className?: string;
    // onclick: ()=>void;
}
export const HeaderButton = ({ title, className }: Props) => {
    return (
        <div>
        <h1 className={cn("text-lg font-medium cursor-pointer relative group px-1 text-center",className)}>
            <span className="relative z-10 transition-colors duration-100 group-hover:text-white">
                {title}
            </span>
            <span className="absolute inset-0 m-auto w-full h-full rounded-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-50 transform scale-0 group-hover:scale-125">
            </span>
        </h1>
        </div>
    );
}