import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { toast, Toast } from "@vr_patel/tui";

// Quick one-liners
console.log(toast.success("Build completed!"));
console.log(toast.error("Connection failed"));
console.log(toast.warn("Deprecated API"));
console.log(toast.info("Server running on port 3000"));

// With options
const t = new Toast({ timestamp: true });
console.log(t.success("Deployed to production"));`;

export default function ToastPage() {
  return (
    <ComponentPage
      title="Toast"
      description="Styled notification messages for terminal output with 4 preset types: success, error, warning, and info. Supports timestamps."
      badges={[
        { label: "static output", variant: "green" },
        { label: "4 types", variant: "blue" },
      ]}
      code={CODE}
      preview={
        <div className="space-y-4">
          <div>
            <div className="text-[#3fb950] opacity-60">──────────────────────────────────────</div>
            <div><span className="text-[#3fb950] font-bold">✔ SUCCESS</span></div>
            <div><span className="text-[#3fb950]">│</span> Build completed successfully!</div>
            <div className="text-[#3fb950] opacity-60">──────────────────────────────────────</div>
          </div>
          <div>
            <div className="text-[#f85149] opacity-60">──────────────────────────────────────</div>
            <div><span className="text-[#f85149] font-bold">✖ ERROR</span></div>
            <div><span className="text-[#f85149]">│</span> Connection refused on port 5432</div>
            <div className="text-[#f85149] opacity-60">──────────────────────────────────────</div>
          </div>
          <div>
            <div className="text-[#d29922] opacity-60">──────────────────────────────────────</div>
            <div><span className="text-[#d29922] font-bold">⚠ WARNING</span></div>
            <div><span className="text-[#d29922]">│</span> Deprecated API: use v2 endpoint</div>
            <div className="text-[#d29922] opacity-60">──────────────────────────────────────</div>
          </div>
          <div>
            <div className="text-[#58a6ff] opacity-60">──────────────────────────────────────</div>
            <div><span className="text-[#58a6ff] font-bold">ℹ INFO</span></div>
            <div><span className="text-[#58a6ff]">│</span> Server listening on port 3000</div>
            <div className="text-[#58a6ff] opacity-60">──────────────────────────────────────</div>
          </div>
        </div>
      }
      apiTable={[
        { prop: "width", type: "number", default: "0 (auto)", description: "Fixed width or auto-sized" },
        { prop: "padding", type: "number", default: "1", description: "Padding inside the toast" },
        { prop: "timestamp", type: "boolean", default: "false", description: "Show timestamp in header" },
      ]}
    />
  );
}
