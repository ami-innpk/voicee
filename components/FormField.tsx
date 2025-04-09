import React from "react";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Controller, FieldValues, Control } from "react-hook-form";

// T means generic type, it can be any type
// T extends FieldValues means that T must be a type that extends FieldValues
// FieldValues is a type that represents the values of a form field
// T is used to make the FormField component reusable for any form field type
// For example, if you have a form with a name field and an email field, you can use T to specify the type of the form values
// In this case, T can be an object with name and email properties
// For example: type FormValues = { name: string; email: string };

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
}

const FormField = ({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: FormFieldProps<T>) => {


  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <Input className="input" type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormField;
