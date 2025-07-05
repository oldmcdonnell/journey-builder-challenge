import React, { useState } from "react";
import type { FormRendererProps, FieldPrefill } from "../types";
import { getFieldsFromSchema } from "../utils/formutils";
import PrefillModal from "./PrefillModal"; // If you're using default export

const FormRenderer: React.FC<FormRendererProps> = ({
  forms,
  selectedFormId,
  onFieldChange,
  prefillMap,
  onClearPrefill,
  onOpenPrefillModal,
}) => {
  const [modalField, setModalField] = useState<{
    formId: string;
    fieldId: string;
  } | null>(null);

  const selectedForm = forms.find((form) => form.id === selectedFormId);

  if (!selectedForm) {
    console.warn("Selected form ID not found:", selectedFormId, "in", forms);
    return <div>Please select a form to view.</div>;
  }

  const fields = getFieldsFromSchema(
    selectedForm.field_schema,
    selectedForm.ui_schema
  );

  // Handles selecting a prefill source from the modal
  const handleSelect = (
    prefillData: FieldPrefill,
    formId: string,
    fieldId: string
  ) => {
    onFieldChange(formId, fieldId, prefillData); // If you want to support both global/form sources
  };

  return (
    <div>
      <h2>{selectedForm.name}</h2>

      {fields.map((field) => {
        const fieldPrefill = prefillMap?.[selectedForm.id]?.[field.id];

        return (
          <div key={field.id} style={{ marginBottom: "1rem" }}>
            <label htmlFor={field.id}>{field.label}</label>
            <br />
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              value={
                fieldPrefill?.sourceType === "global"
                  ? (fieldPrefill.value as string)
                  : ""
              }
              onChange={(e) =>
                onFieldChange(selectedForm.id, field.id, e.target.value)
              }
            />
            <div style={{ marginTop: "0.5rem" }}>
              {fieldPrefill ? (
                <button
                  onClick={() => onClearPrefill(selectedForm.id, field.id)}
                >
                  ❌ Clear Prefill
                </button>
              ) : (
                <button
                  onClick={() =>
                    setModalField({ formId: selectedForm.id, fieldId: field.id })
                  }
                >
                  ➕ Set Prefill
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* ✅ Modal Rendering */}
      {modalField && (
        <PrefillModal
          availableForms={forms}
          selectedForm={selectedForm}
           // you might want to filter these
          onSelect={(prefillData) => {
            handleSelect(prefillData, modalField.formId, modalField.fieldId);
            setModalField(null);
          }}
          onCancel={() => setModalField(null)}
        />
      )}
    </div>
  );
};

export default FormRenderer;
