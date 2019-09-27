import React from "react";
import { Field } from "react-final-form";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";

const style = {
  color: "#f44336"
};

const CustomField = ({
  validation,
  type,
  placeholder,
  label,
  variant,
  fullWidth,
  name,
  initialvalue,
  multiline
}) => (
  <Field name={name} validate={validation} initialValue={initialvalue}>
    {({ input, meta }) => (
      <div>
        <TextField
          {...input}
          type={type}
          placeholder={placeholder}
          label={label}
          variant={variant}
          fullWidth={fullWidth}
          error={Boolean(meta.error && meta.touched && meta.error)}
          multiline={multiline}
        />
        {meta.error && meta.touched && (
          <FormHelperText style={style}>{meta.error}</FormHelperText>
        )}
      </div>
    )}
  </Field>
);

export default CustomField;
