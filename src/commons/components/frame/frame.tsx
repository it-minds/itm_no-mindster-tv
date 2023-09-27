import { FC } from "react";
import YellowHexagonShape from "@/commons/assets/shapes/hexagon-yellow.png";
import BlueTriangleShape from "@/commons/assets/shapes/triangle-blue.png";
import Image from "next/image";

type FrameProps = {
    children: React.ReactNode;
};

const Frame: FC<FrameProps> = ({ children }) => {
    return (
        <main className="relative grid h-full grid-cols-12 grid-rows-6 gap-12 overflow-hidden bg-background p-10 dark">
            {children}
        </main>
    );
};

export default Frame;
