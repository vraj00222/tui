import { ComponentPage } from "@/components/ComponentPage";

const CODE = `import { input } from "tui";

// Basic input
const name = await input({ message: "What is your name?" });

// With validation
const email = await input({
  message: "Email:",
  validate: (v) => v.includes("@") || "Must be a valid email",
});

// Password input (masked)
const password = await input({
  message: "Password:",
  mask: "*",
  validate: (v) => v.length >= 8 || "Must be at least 8 characters",
});

// With placeholder and default
const port = await input({
  message: "Port:",
  placeholder: "3000",
  defaultValue: "3000",
});`;

export default function InputPage() {
  return (
    <ComponentPage
      title="Input"
      description="Interactive text input prompt with placeholder text, default values, validation messages, and password masking."
      badges={[
        { label: "interactive", variant: "blue" },
        { label: "async", variant: "purple" },
      ]}
      code={CODE}
      preview={
        <div>
          <div className="text-[#8b949e] mb-2">Placeholder state:</div>
          <div><span className="text-[#3fb950] font-bold">?</span> <span className="font-bold">What is your name?</span> <span className="text-[#8b949e] opacity-60">Enter your name...</span></div>

          <div className="text-[#8b949e] mb-2 mt-4">Typing:</div>
          <div><span className="text-[#3fb950] font-bold">?</span> <span className="font-bold">What is your name?</span> <span className="text-[#79c0ff]">Alice</span></div>

          <div className="text-[#8b949e] mb-2 mt-4">Confirmed:</div>
          <div><span className="text-[#3fb950]">✔</span> <span className="font-bold">What is your name?</span> <span className="text-[#79c0ff]">Alice</span></div>

          <div className="text-[#8b949e] mb-2 mt-4">Validation error:</div>
          <div><span className="text-[#3fb950] font-bold">?</span> <span className="font-bold">Email:</span> <span className="text-[#79c0ff]">foo</span></div>
          <div>  <span className="text-[#f85149]">✖ Must be a valid email</span></div>

          <div className="text-[#8b949e] mb-2 mt-4">Masked input:</div>
          <div><span className="text-[#3fb950] font-bold">?</span> <span className="font-bold">Password:</span> <span className="text-[#79c0ff]">****</span></div>
        </div>
      }
      apiTable={[
        { prop: "message", type: "string", default: "required", description: "Prompt question" },
        { prop: "defaultValue", type: "string", default: '""', description: "Default value if empty" },
        { prop: "placeholder", type: "string", default: '""', description: "Placeholder text shown when empty" },
        { prop: "validate", type: "(v: string) => true | string", default: "undefined", description: "Validation function returning error message" },
        { prop: "mask", type: "string", default: "undefined", description: 'Mask character for passwords (e.g., "*")' },
      ]}
    />
  );
}
