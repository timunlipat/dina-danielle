type Props = {
    title: string;
}
export const HeaderButton = ( { title }: Props ) => {
    return (
        <div>
            <h1 className="text-lg font-semibold cursor-pointer hover:underline hover:underline-offset-[20px] decoration-[2px] hover:decoration-red-500 tracking-wider caret-transparent antialiased font-sans">
                {title}
            </h1>
        </div>
    );
}