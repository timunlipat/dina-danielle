type Props = {
    title: string;
    // onclick: ()=>void;
}
export const HeaderButton = ( { title }: Props ) => {
    return (
        <div>
            <h1 className="text-lg font-medium cursor-pointer hover:underline hover:underline-offset-[15px] decoration-[2px] hover:decoration-red-700 caret-transparent antialiased">
                {title}
            </h1>
        </div>
    );
}