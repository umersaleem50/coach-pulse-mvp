import { DAYS_OF_WEEK } from "@/constants";

export type DayOfWeekType = (typeof DAYS_OF_WEEK)[number]["value"];

export const DayOfWeekLabelType: Record<DayOfWeekType, string> =
  Object.fromEntries(DAYS_OF_WEEK.map((t) => [t.value, t.label])) as Record<
    DayOfWeekType,
    string
  >;
