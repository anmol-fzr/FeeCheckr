import { ref, onValue } from "@firebase/database";
import { useEffect, useState } from "react";
import { fbRealTimeDB } from "@/config";
import { Alert, AlertTitle, AlertDescription } from "@/components";

const Users = () => {
	const [settings, setSettings] = useState({
		isFormOpen: false,
	});

	useEffect(() => {
		const settingsRef = ref(fbRealTimeDB);
		onValue(settingsRef, (snapshot: any) => {
			const data = snapshot.val();
			setSettings(data.settings);
		});
	}, []);

	return (
		<>
			{settings.isFormOpen && (
				<Alert variant="caution">
					<div>
						<AlertTitle> 📢 Attention !</AlertTitle>
						<AlertDescription>
							<p>Fee forms are Open, student can fill forms.</p>
						</AlertDescription>
					</div>
				</Alert>
			)}
			<h1 className="text-5xl m-auto">Dashboard</h1>
			{/*
			<div className=" grid grid-cols-4 gap-12 w-full">
				<Chart />
				<Chart />
				<Chart />
				<Chart />
			</div>
      */}
		</>
	);
};

export { Users };
