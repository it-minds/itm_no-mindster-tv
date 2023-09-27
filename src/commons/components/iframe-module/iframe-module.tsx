type IframeProps = {
    src: string;
    title: string;
};

const IframeModule: React.FC<IframeProps> = ({ src, title }) => {
    return (
        <iframe
            src={src}
            title={title}
            style={{ width: "100%", height: "100%" }}
            scrolling="no"
        />
    );
};

export default IframeModule;
