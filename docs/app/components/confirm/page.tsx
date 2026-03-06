import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { confirm } from "tui";

const ok = await confirm({
  message: "Delete all files?",
  defaultValue: false,
});

if (ok) {
  console.log("Deleted!");
} else {
  console.log("Cancelled.");
}`;

export default function ConfirmPage() {
  return (
    <ComponentPage
      title="Confirm"
      description="Yes/No confirmation prompt with keyboard toggle. Supports arrow keys, y/n keys, Tab, and vim bindings."
      badges={[
        { label: "interactive", variant: "blue" },
        { label: "async", variant: "purple" },
      ]}
      code={CODE}
      preview={
        <div>
          <div className="text-[#8b949e] mb-2">Default state (No selected):</div>
          <div><span className="text-[#3fb950] font-bold">?</span> <span className="font-bold">Delete all files?</span> <span className="text-[#8b949e]">Yes</span> <span className="text-[#8b949e]">/</span> <span className="text-[#79c0ff] font-bold underline">No</span></div>

          <div className="text-[#8b949e] mb-2 mt-4">Toggled to Yes:</div>
          <div><span className="text-[#3fb950] font-bold">?</span> <span className="font-bold">Delete all files?</span> <span className="text-[#79c0ff] font-bold underline">Yes</span> <span className="text-[#8b949e]">/</span> <span className="text-[#8b949e]">No</span></div>

          <div className="text-[#8b949e] mb-2 mt-4">Confirmed:</div>
          <div><span className="text-[#3fb950]">✔</span> <span className="font-bold">Delete all files?</span> <span className="text-[#3fb950]">Yes</span></div>

          <div className="text-[#8b949e] mb-2 mt-4">Cancelled:</div>
          <div><span className="text-[#f85149]">✖ Cancelled</span></div>
        </div>
      }
      apiTable={[
        { prop: "message", type: "string", default: "required", description: "Prompt question" },
        { prop: "defaultValue", type: "boolean", default: "false", description: "Default selection (Yes or No)" },
        { prop: "activeColor", type: "string", default: "fg.cyan", description: "Color for the active choice" },
      ]}
    />
  );
}
