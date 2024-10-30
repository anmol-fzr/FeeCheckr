import { Chart } from "@/components/dashboard/Chart";
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { fbRealTimeDB } from "@/config";
import { Alert, AlertTitle, AlertDescription } from "@/components";

const Users = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const settingsRef = ref(fbRealTimeDB);
    onValue(settingsRef, (snapshot) => {
      const data = snapshot.val();
      setSettings(data);
    });
  }, []);

  return (
    <>
      <Alert
        variant="caution"
        //className="w-full flex items-end justify-between gap-6 flex-wrap animate-in fade-in"
      >
        <div>
          <AlertTitle> 📢 Attention !</AlertTitle>
          <AlertDescription>
            <p>Fee forms are Open, student can fill forms.</p>
          </AlertDescription>
        </div>
      </Alert>
      <div className=" grid grid-cols-4 gap-12 w-full">
        <Chart />
        <Chart />
        <Chart />
        <Chart />
      </div>
    </>
  );
};

export { Users };
