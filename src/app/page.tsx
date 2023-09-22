import IframeModule from "@/commons/iframe-module/iframe-module";
import { Button } from "@nextui-org/button";
import Frame from "@/commons/frame/frame";
import Image from "next/image";
import LogoWhite from "@/commons/assets/logo/logo-white.png";
import YellowHexagonShape from "@/commons/assets/shapes/hexagon-yellow.png";
import BlueTriangleShape from "@/commons/assets/shapes/triangle-blue.png";
import Framed from "@/commons/framed/framed";

export default function Home() {
    return (
        <Frame>
            <div className="absolute right-[-15vw] top-[-23vw] h-[50vw] w-[50vw] rotate-45">
                <Image
                    src={BlueTriangleShape}
                    alt="Yellow square shape"
                    quality="100"
                    priority={true}
                />
            </div>
            <Framed row={1} col={1} height={4} width={3}>
                <IframeModule
                    src="https://mon.ruter.no/departures/59.908077-10.7569/N4Igrgzgpgwg9gGzAWwHYBkCGBPOYAuIAXPgE5hQA0IARnJqQCYTEDaoE+cADgAoKYAxlACSzNiAByAZQBKRaVz4DhRAKwAOAMwA2AOwgAutUZQB2KI0UN8AFQCWyKMQCM1ABb3GpjPdRQWImAAX2pUFBooUgB5ADMAEShuGzBSAOINanx7fARnIhAAIQArAA-SADd7AGtMEBN7CEwaPMZbUkxUCG44UnwAWThTQNZjEChUZtbiMgoPLyh2oWr4JDRiWMwEaFCOJX4hUXEiVik5BX2VKHVtHR16s-lFHgPVNQBODT0AJiMTMxwlmsfQcTmIWnm3gm6D86SCjwuLyu6k+PwkMnkAEUwDh1DotABaPQABgJAGkGNt8JhGATnoJqu5EMgHhiiNjcWp8QSAGIucmkRrZfzuTDrahsjnYdRc3n8smCziw0XihFSmUAFl5WsKUQA5hNWed1Wo1FqeVqAGpwCAsCXGnHSrk6bUE3WkA2oI1Yx14l0WgnW23e9m+tQk11Bu1qsMRgPuz0h9X8+P6w32n2cs28tR06kVToG0hJsPZnm5hVC+ydJqoRglzlx3PWAuoIsNp1NgVVmudesZ0ON0nlgnxDptyxbDtEFMVxXZXt16dc768l0whB5FVOYsDk3cnnr+ybqDbqLL8O89AATX50QgCDgAAJ0GBYvhRRUvXvS3or9fV3vR8XzfD9MC-ZcdHef9AIfZ9X3fT8vUMUIQHCZBIhiBIkhSNJAkyEBslyfIQAAKSiVAaE6KAuA9GiHkYRopksJYuh6PpBmGNgxgmZj6xIcgqBATxTCWBlVhQL0iE2bYoGCMYKiiCB7DgKTvmCIA"
                    title="Ruter"
                />
            </Framed>
            <Framed row={1} col={4} height={5} width={6}>
                <IframeModule
                    src="https://matssom.github.io/countdown"
                    title="Yr"
                />
            </Framed>
            <Framed row={2} col={10} height={4} width={3}>
                <IframeModule
                    src="https://www.yr.no/nb/innhold/1-72837/table.html"
                    title="Yr"
                />
            </Framed>
            <Framed row={6} col={8} height={1} width={5}>
                <Image
                    src={LogoWhite}
                    alt="Twoday It Minds logo"
                    quality={100}
                    priority={true}
                />
            </Framed>
            <div className="absolute bottom-[-27vw] left-[-25vw] h-[60vw] w-[55vw]">
                <Image
                    src={YellowHexagonShape}
                    alt="Yellow square shape"
                    quality="100"
                    priority={true}
                />
            </div>
        </Frame>
    );
}
