import { useFormContext, Controller } from "react-hook-form";
import { TextField } from "@mui/material";

function FSelect({ name, children, ...other }) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    {...field}
                    select
                    // fullWidth
                    sx={{width:{xs:100, sm:150, md:200, lg:300}}}
                    color="secondary" focused 
                    SelectProps={{ native: true }}
                    error={!!error}
                    helperText={error?.message}
                    {...other}
                >
                    {children}
                </TextField>
            )}
        />
    );
}

export default FSelect;