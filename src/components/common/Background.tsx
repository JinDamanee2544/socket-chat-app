interface IBgProp {
    isCentered?: boolean;
    children: React.ReactNode;
}

const bg = (props: IBgProp) => {
    const { isCentered } = props;
    return (
        <div className={`w-full h-full flex flex-col justify-center bg-slate-300 ${isCentered ? "items-center" : ""}`}>
            {props.children}
        </div>
    )
}
export default bg;