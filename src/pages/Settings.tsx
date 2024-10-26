import { PageHeader } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettingsStore } from "@/store";
import { useState } from "react";

const s = ["short", "full", "long", "medium"] as const;
const now = new Date();

const savedDateStyle = useSettingsStore.getState().dateTime.dateStyle;
const savedTimeStyle = useSettingsStore.getState().dateTime.timeStyle;
const updateDTStyle = useSettingsStore.getState().updateSettings;

export function Settings() {
  const [currDateStyle, setCurrDateStyle] = useState(() => savedDateStyle);
  const [currTimeStyle, setCurrTimeStyle] = useState(() => savedTimeStyle);

  const onSave = () => {
    updateDTStyle({
      dateStyle: currDateStyle,
      timeStyle: currTimeStyle,
    });
  };

  return (
    <>
      <PageHeader title="Settings" desc="Manage your account settings." />

      <Card className="w-full md:w-[500px]">
        <CardHeader>
          <CardTitle>Date and Time Format</CardTitle>
          <CardDescription>
            Change the format of dates shown in the Application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Date</Label>
                <Select onValueChange={setCurrDateStyle} value={currDateStyle}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {s.map((dateStyle) => (
                      <SelectItem value={dateStyle} key={dateStyle}>
                        {new Intl.DateTimeFormat("en-IN", {
                          dateStyle,
                          timeZone: "Asia/Kolkata",
                        })
                          .format(now)
                          .toString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Time Style</Label>
                <Select onValueChange={setCurrTimeStyle} value={currTimeStyle}>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {s.map((dateStyle) => (
                      <SelectItem value={dateStyle} key={dateStyle}>
                        {new Intl.DateTimeFormat("en-IN", {
                          timeStyle: dateStyle,
                          timeZone: "Asia/Kolkata",
                        })
                          .format(now)
                          .toString()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p>
                {new Intl.DateTimeFormat("en-IN", {
                  dateStyle: currDateStyle,
                  timeStyle: currTimeStyle,
                  timeZone: "Asia/Kolkata",
                })
                  .format(now)
                  .toString()}
              </p>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={onSave}>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
}
