interface Props {
    title: string
}


const LogWrapper = ({ title }: Props) => {
    return (
        <div className="log-wrapper">
            <h2>{title}</h2>
        </div>
    );
};


export default LogWrapper;