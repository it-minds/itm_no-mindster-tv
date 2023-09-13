import IframeModule from "@/commons/iframe-module/iframe-module";
import { Button } from "@nextui-org/button";

export default function Home() {
    return (
        <main className="flex h-full">
            <IframeModule
                src="https://mon.ruter.no/departures/59.908077-10.7569/N4Igrgzgpgwg9gGzAWwHYBkCGBPOYAuIAXPgE5hQA0IARnJqQCYTEDaoE+cADgAoKYAxlACSzNiAByAZQBKRaVz4DhRAKwAOAMwA2AOwgAutUZQB2KI0UN8AFQCWyKMQCM1ABb3GpjPdRQWImAAX2pUFBooUgB5ADMAEShuGzBSAOINanx7fARnIhAAIQArAA-SADd7AGtMEBN7CEwaPMZbUkxUCG44UnwAWThTQNZjEChUZtbiMgoPLyh2oWr4JDRiWMwEaFCOJX4hUXEiVik5BX2VKHVtHR16s-lFHgPVNQBODT0AJiMTMxwlmsfQcTmIWnm3gm6D86SCjwuLyu6k+PwkMnkAEUwDh1DotABaPQABgJAGkGNt8JhGATnoJqu5EMgHhiiNjcWp8QSAGIucmkRrZfzuTDrahsjnYdRc3n8smCziw0XihFSmUAFl5WsKUQA5hNWed1Wo1FqeVqAGpwCAsCXGnHSrk6bUE3WkA2oI1Yx14l0WgnW23e9m+tQk11Bu1qsMRgPuz0h9X8+P6w32n2cs28tR06kVToG0hJsPZnm5hVC+ydJqoRglzlx3PWAuoIsNp1NgVVmudesZ0ON0nlgnxDptyxbDtEFMVxXZXt16dc768l0whB5FVOYsDk3cnnr+ybqDbqLL8O89AATX50QgCDgAAJ0GBYvhRRUvXvS3or9fV3vR8XzfD9MC-ZcdHef9AIfZ9X3fT8vUMUIQHCZBIhiBIkhSNJAkyEBslyfIQAAKSiVAaE6KAuA9GiHkYRopksJYuh6PpBmGNgxgmZj6xIcgqBATxTCWBlVhQL0iE2bYoGCMYKiiCB7DgKTvmCIA"
                title="Ruter"
            />
            <IframeModule
                src="https://www.yr.no/nb/innhold/1-72837/table.html"
                title="Yr"
            />
            <Button></Button>
        </main>
    );
}
