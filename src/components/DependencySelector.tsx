import React from "react";
import type { DependencySelectorProps } from "../types";

const DependencySelector: React.FC<DependencySelectorProps> = ({
  dispatch,
  availableForms,
  selectedFormId,
}) => {
  const handleToggle = (otherFormId: string) => {
    dispatch({
      type: 'TOGGLE_DEPENDENCY',
      formId: selectedFormId,
      dependencyId: otherFormId,
    });
  };

  const selectedForm = availableForms.find(form => form.id === selectedFormId);
  if (!selectedForm) return null;

  return (
    <div>
      <h3>Dependencies</h3>
      <ul>
        {availableForms
          .filter((form) => form.id !== selectedFormId) // skip self
          .map((form) => (
            <li key={form.id}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedForm.dependencies?.includes(form.id) || false}
                  onChange={() => handleToggle(form.id)}
                />
                {form.name}
              </label>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DependencySelector;
