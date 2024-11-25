"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  NodeTypes,
  Panel,
  useNodesState,
  useEdgesState,
  Connection,
  addEdge,
  Handle,
  Position,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

interface FormField {
  id: string;
  type: "text" | "email" | "rating" | "textarea";
  label: string;
  required: boolean;
  placeholder?: string;
  order: number;
}

interface ReviewFormWidget {
  id: string;
  name: string;
  type: "review-form";
  config?: {
    fields?: FormField[];
    submitButtonText?: string;
    successMessage?: string;
  };
  isActive: boolean;
}

// Custom Node Component
function FormFieldNode({ data, isConnectable }: any) {
  return (
    <div
      className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 
      dark:border-slate-700 shadow-lg w-[300px]"
    >
      {/* Input Handle */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white dark:border-slate-800"
      />

      {/* Node Content */}
      <div
        className="p-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 
        dark:bg-slate-900 rounded-t-xl flex justify-between items-center"
      >
        <span className="font-medium text-slate-700 dark:text-slate-300">
          {data.type.charAt(0).toUpperCase() + data.type.slice(1)} Field
        </span>
        <button
          onClick={() => data.onRemove(data.id)}
          className="p-1 text-slate-400 hover:text-red-600 rounded"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 space-y-3">
        <input
          type="text"
          value={data.label}
          onChange={(e) => data.onUpdate(data.id, { label: e.target.value })}
          className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600
            bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Field Label"
        />

        <input
          type="text"
          value={data.placeholder || ""}
          onChange={(e) => data.onUpdate(data.id, { placeholder: e.target.value })}
          className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 dark:border-slate-600
            bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-500"
          placeholder="Placeholder text"
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id={`required-${data.id}`}
            checked={data.required}
            onChange={(e) => data.onUpdate(data.id, { required: e.target.checked })}
            className="rounded border-slate-300 text-blue-600"
          />
          <label
            htmlFor={`required-${data.id}`}
            className="text-sm text-slate-600 dark:text-slate-400"
          >
            Required field
          </label>
        </div>
      </div>

      {/* Output Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="w-3 h-3 bg-blue-500 border-2 border-white dark:border-slate-800"
      />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  formField: FormFieldNode,
};

// Toolbar component
function Toolbar({ onAddField }: { onAddField: (type: FormField["type"]) => void }) {
  const fieldTypes: { type: FormField["type"]; icon: string; label: string }[] = [
    { type: "text", icon: "T", label: "Text Field" },
    { type: "email", icon: "@", label: "Email Field" },
    { type: "rating", icon: "★", label: "Rating Field" },
    { type: "textarea", icon: "¶", label: "Text Area" },
  ];

  return (
    <Panel position="top-left" className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
      <div className="flex gap-2">
        {fieldTypes.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onAddField(type)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg 
              text-slate-600 dark:text-slate-400 group relative"
            title={label}
          >
            <span className="w-8 h-8 flex items-center justify-center text-lg font-medium">
              {icon}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}

// Preview component
function FormPreview(props: ReviewFormWidget["config"]) {
  const {
    fields = [],
    submitButtonText = "Submit Review",
    successMessage = "Thank you for your review!",
  } = props || {};

  return (
    <div
      className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 
      dark:border-slate-700 shadow-sm"
    >
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {fields.map((field) => (
          <div key={field.id} className="space-y-2">
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">
              {field.label}
              {field.required && <span className="text-red-600 dark:text-red-400 ml-1">*</span>}
            </label>
            {field.type === "text" && (
              <input
                type="text"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600
                  bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            {field.type === "email" && (
              <input
                type="email"
                placeholder={field.placeholder}
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600
                  bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            {field.type === "textarea" && (
              <textarea
                placeholder={field.placeholder}
                rows={4}
                className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-600
                  bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 
                  focus:ring-blue-500 focus:border-blue-500"
              />
            )}
            {field.type === "rating" && (
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className="p-2 hover:text-yellow-500 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg 
            transition-colors font-medium focus:ring-2 focus:ring-blue-500 
            focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
}

// Add Loading Component
function LoadingState() {
  return (
    <div className="h-[calc(100vh-5rem)] bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div
          className="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 border-t-blue-600 
          rounded-full animate-spin mx-auto"
        />
        <div className="text-slate-600 dark:text-slate-400 font-medium">
          Loading form builder...
        </div>
      </div>
    </div>
  );
}

// Add Error Component
function ErrorState({ message }: { message: string }) {
  const router = useRouter();

  return (
    <div className="h-[calc(100vh-5rem)] bg-slate-100 dark:bg-slate-900 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 text-center space-y-6">
        <div
          className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center 
          justify-center mx-auto"
        >
          <svg
            className="w-8 h-8 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Failed to load form builder
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">{message}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 
                bg-white dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-600 
                hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={() => router.push("/dashboard/widgets")}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg 
                hover:bg-blue-700 transition-colors"
            >
              Back to Widgets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReviewFormBuilder() {
  const params = useParams();
  const router = useRouter();

  // Group all useState hooks together
  const [widget, setWidget] = useState<ReviewFormWidget | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  // ReactFlow state
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Group all useCallback hooks together
  const updateField = useCallback(
    (fieldId: string, updates: Partial<FormField>) => {
      if (!widget) return;

      setWidget({
        ...widget,
        config: {
          ...widget.config,
          fields: (widget.config?.fields || []).map((field) =>
            field.id === fieldId ? { ...field, ...updates } : field
          ),
        },
      });

      setNodes((nds) =>
        nds.map((node) =>
          node.id === fieldId ? { ...node, data: { ...node.data, ...updates } } : node
        )
      );
    },
    [widget, setNodes]
  );

  const removeField = useCallback(
    (fieldId: string) => {
      if (!widget) return;

      setWidget({
        ...widget,
        config: {
          ...widget.config,
          fields: (widget.config?.fields || []).filter((f) => f.id !== fieldId),
        },
      });

      setNodes((nds) => nds.filter((node) => node.id !== fieldId));
    },
    [widget, setNodes]
  );

  const fieldsToNodes = useCallback(
    (fields: FormField[]) => {
      return fields.map((field, index) => ({
        id: field.id,
        type: "formField",
        position: { x: 100 + (index % 2) * 400, y: 100 + Math.floor(index / 2) * 300 },
        data: {
          ...field,
          onUpdate: updateField,
          onRemove: removeField,
        },
      }));
    },
    [updateField, removeField]
  );

  const addField = useCallback(
    (type: FormField["type"]) => {
      if (!widget) return;

      const newField: FormField = {
        id: crypto.randomUUID(),
        type,
        label: `New ${type} field`,
        required: false,
        placeholder: "",
        order: widget.config?.fields?.length || 0,
      };

      const newNode = {
        id: newField.id,
        type: "formField",
        position: { x: 100, y: 100 },
        data: {
          ...newField,
          onUpdate: updateField,
          onRemove: removeField,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setWidget({
        ...widget,
        config: {
          ...widget.config,
          fields: [...(widget.config?.fields || []), newField],
        },
      });
    },
    [widget, setNodes, updateField, removeField]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "#60A5FA" },
            markerEnd: { type: MarkerType.ArrowClosed, color: "#60A5FA" },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  const saveChanges = useCallback(async () => {
    if (!widget) return;
    setSaving(true);

    try {
      const response = await fetch(`/api/widgets/${widget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          config: {
            ...widget.config,
            fields: widget.config?.fields || [],
            connections: edges,
          },
        }),
      });

      if (!response.ok) throw new Error("Failed to save changes");
      toast.success("Changes saved successfully");
    } catch (error) {
      toast.error("Failed to save changes");
      console.error(error);
    } finally {
      setSaving(false);
    }
  }, [widget, edges]);

  // useEffect hooks
  useEffect(() => {
    async function fetchWidget() {
      try {
        const response = await fetch(`/api/widgets/${params.id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error("Widget not found");
          if (response.status === 401) throw new Error("Unauthorized access");
          throw new Error("Failed to load widget");
        }
        const data = await response.json();
        setWidget(data);
        setNodes(fieldsToNodes(data.config?.fields || []));
      } catch (error) {
        const message = error instanceof Error ? error.message : "Something went wrong";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    }

    fetchWidget();
  }, [params.id, fieldsToNodes, setNodes]);

  // Rest of the component remains the same...
  if (loading) return <LoadingState />;
  if (error || !widget) return <ErrorState message={error || "Widget not found"} />;

  return (
    <div className="h-[calc(100vh-5rem)] bg-slate-100 dark:bg-slate-900 overflow-y-hidden">
      {/* Header */}
      <div
        className="h-14 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 
        px-4 flex items-center justify-between"
      >
        <div>
          <h1 className="font-semibold text-slate-900 dark:text-white">{widget?.name}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Form Builder</p>
        </div>
        <button
          onClick={saveChanges}
          disabled={saving}
          className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium 
            hover:bg-blue-700 transition-colors"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Grid Layout Container - Adjusted height calculation */}
      <div className="grid grid-cols-[1fr,350px] h-[calc(100%-3.5rem)]">
        {/* Node Editor Section */}
        <div className="relative border-r border-slate-200 dark:border-slate-700">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            className="bg-slate-50 dark:bg-slate-900"
            defaultEdgeOptions={{
              animated: true,
              style: { stroke: "#60A5FA" },
              markerEnd: { type: MarkerType.ArrowClosed, color: "#60A5FA" },
            }}
          >
            <Background gap={16} size={1} />
            <Controls />
            <Toolbar onAddField={addField} />
          </ReactFlow>
        </div>

        {/* Preview Section */}
        <div className="bg-white dark:bg-slate-800 overflow-hidden flex flex-col">
          <div className="p-3 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-sm font-medium text-slate-900 dark:text-white">Live Preview</h2>
          </div>
          <div className="p-4 overflow-y-auto flex-1 custom-scrollbar">
            <div className="scale-90 origin-top">
              <FormPreview {...widget?.config!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add this CSS somewhere in your global styles
const globalStyles = `
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(156, 163, 175, 0.5) transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(156, 163, 175, 0.5);
    border-radius: 3px;
  }
`;
