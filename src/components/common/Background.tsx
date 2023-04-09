interface IBgProp {
    children: React.ReactNode;
}

const bg = (props: IBgProp) => {
    return (
        <div className="w-full h-full flex flex-col justify-center bg-slate-300">
            {props.children}
        </div>
    )
}
export default bg;