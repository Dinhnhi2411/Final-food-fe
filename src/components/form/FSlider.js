import { Slider } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

function FSlider({ name, ...other }) {
  const { control } = useFormContext();

  function valuetext(value) {
    return value;
  }

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Slider
            {...field}
            getAriaValueText={valuetext}
            onChange={(_, value) => {
              field.onChange(value);
            }}
            error={error}
            valueLabelDisplay="auto"
            {...other}
          />
        )}
      />
    </>
  );
}

export default FSlider;