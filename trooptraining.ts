import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

export default function TroopTraining() {
  const [enabled, setEnabled] = useState(false);
  const [percentage, setPercentage] = useState(50);
  const [interval, setInterval] = useState(10);

  useEffect(() => {
    if (enabled) {
      const trainTroops = () => {
        console.log(`Training troops with ${percentage}% resources every ${interval} minutes`);
      };
      
      trainTroops();
      const timer = setInterval(trainTroops, interval * 60000);
      return () => clearInterval(timer);
    }
  }, [enabled, percentage, interval]);

  return (
    <Card className="p-4 w-full">
      <CardContent>
        <h2 className="text-xl font-bold mb-2">Troop Training Automation</h2>
        <Button onClick={() => setEnabled(!enabled)}>{enabled ? "Disable" : "Enable"}</Button>
        <div className="mt-4">
          <label className="block text-sm font-medium">Resource Allocation (%)</label>
          <Slider value={[percentage]} onValueChange={(val) => setPercentage(val[0])} min={0} max={100} step={5} />
          <span>{percentage}%</span>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium">Training Interval (minutes)</label>
          <Input type="number" value={interval} onChange={(e) => setInterval(Number(e.target.value))} min={1} />
        </div>
      </CardContent>
    </Card>
  );
}
