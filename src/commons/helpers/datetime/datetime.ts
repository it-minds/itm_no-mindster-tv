import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import relativeTime from "dayjs/plugin/relativeTime";
import nb from "dayjs/locale/nb";
import calendar from "dayjs/plugin/calendar";

dayjs.extend(isoWeek);
dayjs.extend(calendar);
dayjs.extend(relativeTime);
dayjs.locale(nb);

export const formatDate = (date: Date, format: string = "YYYY-MM-DD") => {
    return dayjs(date).format(format);
};
