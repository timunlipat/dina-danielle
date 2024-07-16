type Props = {
    title: string;
    // onclick: ()=>void;
}
export const HeaderButton = ( { title }: Props ) => {
    return (
        <div>
            <h1 className="text-lg font-semibold cursor-pointer hover:underline hover:underline-offset-[15px] decoration-[2px] hover:decoration-black caret-transparent antialiased">
                {title}
            </h1>
        </div>
    );
}