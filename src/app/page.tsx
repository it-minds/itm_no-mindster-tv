import IframeModule from "@/commons/components/iframe-module/iframe-module";
import { Button } from "@nextui-org/button";
import Frame from "@/commons/components/frame/frame";
import Image from "next/image";
import LogoWhite from "@/commons/assets/logo/logo-white.png";
import YellowHexagonShape from "@/commons/assets/shapes/hexagon-yellow.png";
import BlueTriangleShape from "@/commons/assets/shapes/triangle-blue.png";
import Framed from "@/commons/components/framed/framed";
import ClockModule from "@/modules/clock/clock-module";
import Chris from "@/commons/assets/images/Chris-modified.jpg";

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
            <Framed row={1} col={1} height={4} width={6}>
                <IframeModule
                    src="https://mon.ruter.no/departures/59.908077-10.7569/N4Igrgzgpgwg9gGzAWwHYBkCGBPOYAuIAXPgE5hQA0IARnJqQCYTEDaoE+cADgAoKYAxlACSzNiAByAZQBKRaVz4DhRAKwAOAMwA2AOwgAutUZQB2KI0UN8AFQCWyKMQCM1ABb3GpjPdRQWImAAX2pUFBooUgB5ADMAEShuGzBSAOINanx7fARnIhAAIQArAA-SADd7AGtMEBN7CEwaPMZbUkxUCG44UnwAWThTQNZjEChUZtbiMgoPLyh2oWr4JDRiWMwEaFCOJX4hUXEiVik5BX2VKHVtHR16s-lFHgPVNQBODT0AJiMTMxwlmsfQcTmIWnm3gm6D86SCjwuLyu6k+PwkMnkAEUwDh1DotABaPQABgJAGkGNt8JhGATnoJqu5EMgHhiiNjcWp8QSAGIucmkRrZfzuTDrahsjnYdRc3n8smCziw0XihFSmUAFl5WsKUQA5hNWed1Wo1FqeVqAGpwCAsCXGnHSrk6bUE3WkA2oI1Yx14l0WgnW23e9m+tQk11Bu1qsMRgPuz0h9X8+P6w32n2cs28tR06kVToG0hJsPZnm5hVC+ydJqoRglzlx3PWAuoIsNp1NgVVmudesZ0ON0nlgnxDptyxbDtEFMVxXZXt16dc768l0whB5FVOYsDk3cnnr+ybqDbqLL8O89AATX50QgCDgAAJ0GBYvhRRUvXvS3or9fV3vR8XzfD9MC-ZcdHef9AIfZ9X3fT8vUMUIQHCZBIhiBIkhSNJAkyEBslyfIQAAKSiVAaE6KAuA9GiHkYRopksJYuh6PpBmGNgxgmZj6xIcgqBATxTCWBlVhQL0iE2bYoGCMYKiiCB7DgKTvmCIA"
                    title="Ruter"
                />
            </Framed>
            {/*
            <Framed row={2} col={7} height={4} width={6}>
                <IframeModule
                    src="https://www.yr.no/nb/innhold/1-72837/table.html"
                    title="Yr"
                />
            </Framed>
            */}
            <Framed row={1} col={7} height={6} width={6}>
                <Image src={Chris} alt="RIP" quality="100" priority={true} />
            </Framed>
            <Framed row={6} col={2} height={1} width={2}>
                <ClockModule />
            </Framed>
            <Framed row={6} col={8} height={1} width={5}>
                <div className="grid h-full place-items-center">
                    <Image
                        src={LogoWhite}
                        alt="Twoday It Minds logo"
                        quality={100}
                        priority={true}
                    />
                </div>
            </Framed>
            <div className="absolute bottom-[-27vw] left-[-30vw] h-[60vw] w-[55vw]">
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
