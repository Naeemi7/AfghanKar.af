// Helper function to split camelCase to two words for better error handling
const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/([A-Z])/g, " $1") // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter
};

export default function useFormValidation(fields, setError) {
  const validateForm = (formData) => {
    for (let field of fields) {
      if (!formData.get(field)) {
        const formattedField = formatFieldName(field);
        setError(`${formattedField} is missing!`);
        return false;
      }
    }
    return true;
  };

  return { validateForm };
}
