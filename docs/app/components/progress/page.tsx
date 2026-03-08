import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { ProgressBar } from "@vr_patel/tui";

const bar = new ProgressBar({
  total: 100,
  width: 40,
  title: "Downloading",
  gradient: true,      // red → yellow → green
  showETA: true,
});

bar.start();
for (let i = 0; i <= 100; i++) {
  bar.update(i);
  await sleep(30);
}
bar.finish("Download complete!");`;

export default function ProgressPage() {
  return (
    <ComponentPage
      title="ProgressBar"
      description="Animated progress bars with gradient colors, percentage display, item counts, and ETA calculation."
      badges={[
        { label: "animated", variant: "purple" },
        { label: "gradient", variant: "green" },
      ]}
      code={CODE}
      preview={
        <div>
          <div>
            <span className="font-bold">Installing </span>
            <span className="text-[#f85149]">█</span>
            <span className="text-[#d29922]">██</span>
            <span className="text-[#e3b341]">███</span>
            <span className="text-[#7ab648]">██████</span>
            <span className="text-[#3fb950]">█████████████</span>
            <span className="text-[#8b949e]">░░░░░░░░░░░░░░░</span>
            {" "}<span className="font-bold text-white"> 65%</span>
            {" "}<span className="text-[#8b949e]">65/100</span>
            {" "}<span className="text-[#d29922]">ETA 1.2s</span>
          </div>
          <div className="mt-3">
            <span className="font-bold">Building </span>
            <span className="text-[#3fb950]">████████████████████████████████████████</span>
            {" "}<span className="font-bold text-white">100%</span>
            {" "}<span className="text-[#8b949e]">100/100</span>
          </div>
          <div><span className="text-[#3fb950] font-bold">✔</span> Build complete!</div>
        </div>
      }
      apiTable={[
        { prop: "total", type: "number", default: "100", description: "Total number of items" },
        { prop: "width", type: "number", default: "40", description: "Width of the bar in characters" },
        { prop: "title", type: "string", default: '""', description: "Label shown before the bar" },
        { prop: "gradient", type: "boolean", default: "true", description: "Enable red → yellow → green gradient" },
        { prop: "showPercentage", type: "boolean", default: "true", description: "Show percentage after bar" },
        { prop: "showCount", type: "boolean", default: "true", description: "Show current/total count" },
        { prop: "showETA", type: "boolean", default: "true", description: "Show estimated time remaining" },
        { prop: "barColor", type: "string", default: "fg.cyan", description: "Color when gradient is off" },
        { prop: "completeChar", type: "string", default: '"█"', description: "Filled bar character" },
        { prop: "incompleteChar", type: "string", default: '"░"', description: "Empty bar character" },
      ]}
    />
  );
}
