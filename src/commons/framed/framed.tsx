import { FC } from "react";

type FramedProps = {
    children: React.ReactNode;
    width: number;
    height: number;
    col: number;
    row: number;
};

const Framed: FC<FramedProps> = ({ children, width, row, col, height }) => {
    return (
        <div
            style={{
                gridColumnStart: col,
                gridColumnEnd: col + width,
                gridRowStart: row,
                gridRowEnd: row + height,
            }}
            className="overflow-hidden rounded-2xl"
        >
            {children}
        </div>
    );
};

export default Framed;
