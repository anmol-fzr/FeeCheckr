import { SettingFormHeader } from "@/components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useSettingsStore } from "@/store";
import { Separator } from "@/components";
import { useState } from "react";

const s = ["short", "full", "long", "medium"] as const;
const now = new Date();

const { dateStyle: savedDateStyle, timeStyle: savedTimeStyle } =
	useSettingsStore.getState().dateTime;
const updateDTStyle = useSettingsStore.getState().updateSettings;

export function UiSettings() {
	const [currDateStyle, setCurrDateStyle] = useState(() => savedDateStyle);
	const [currTimeStyle, setCurrTimeStyle] = useState(() => savedTimeStyle);

	const onSave = () => {
		updateDTStyle({
			dateStyle: currDateStyle,
			timeStyle: currTimeStyle,
		});
	};

	return (
		<div className="space-y-6 w-full ">
			<SettingFormHeader
				title="Tweak User Interface to your liking"
				desc="Change the format of dates shown in the Application."
			/>
			<Separator />

			<form>
				<div className="grid w-full items-center gap-4">
					<div className="flex flex-col space-y-1.5">
						<Label htmlFor="date">Date</Label>
						<Select onValueChange={setCurrDateStyle} value={currDateStyle}>
							<SelectTrigger id="date">
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
						<Label htmlFor="time">Time Style</Label>
						<Select onValueChange={setCurrTimeStyle} value={currTimeStyle}>
							<SelectTrigger id="time">
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
			<Button onClick={onSave}>Save</Button>
		</div>
	);
}
