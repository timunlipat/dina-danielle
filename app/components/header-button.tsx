type Props = {
    title: string;
    // onclick: ()=>void;
}
export const HeaderButton = ( { title }: Props ) => {
    return (
        <div>
        <h1 className="text-lg font-medium cursor-pointer relative group">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                {title}
            </span>
            <span className="absolute inset-0 m-auto w-full h-full rounded-full bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-60 transform scale-0 group-hover:scale-125">
            </span>
        </h1>
        </div>
    );
}