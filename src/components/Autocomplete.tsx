import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import {
  Autocomplete as JoyAutocomplete,
  Box,
  selectClasses,
  TypographySystem,
} from "@mui/joy";
import React from "react";

export function Autocomplete({
  name,
  placeholder,
  defaultValue,
  options,
  getOptionLabel,
  onChange,
  disabled,
  variant,
  textLevel,
}: {
  name: string;
  placeholder: string;
  defaultValue?: string;
  options: any[];
  getOptionLabel?: (_: any) => any;
  onChange: (...args: any[]) => void;
  disabled?: boolean;
  variant: "sheet" | "box";
  textLevel?: keyof TypographySystem;
}) {
  const AutocompleteContent = () => {
    return (
      <>
        <Typography level={textLevel ?? "body-md"}>{name}</Typography>
        <JoyAutocomplete
          key={`autocomplete-${name}`}
          disabled={disabled}
          placeholder={placeholder}
          defaultValue={defaultValue}
          options={options}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={(option, value) => option.value === value.value}
          sx={{
            width: "200px",
            [`& .${selectClasses.indicator}`]: {
              transition: "0.2s",
              [`&.${selectClasses.expanded}`]: {
                transform: "rotate(-180deg)",
              },
            },
          }}
          slotProps={{
            listbox: {
              sx: {
                maxHeight: "300px",
              },
            },
          }}
          onChange={onChange}
        />
      </>
    );
  };

  const sharedContainerStyles = {
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <>
      {variant === "sheet" && (
        <Sheet
          variant="soft"
          sx={{
            py: 1,
            px: 2,
            ...sharedContainerStyles,
          }}
        >
          {/*TODO: There's a bug where the selected autocomplete value won't be displayed if its inside another function..*/}
          {/*<AutocompleteContent />*/}
          <Typography level={textLevel ?? "body-md"}>{name}</Typography>
          <JoyAutocomplete
            key={`autocomplete-${name}`}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{
              width: "200px",
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            slotProps={{
              listbox: {
                sx: {
                  maxHeight: "300px",
                },
              },
            }}
            onChange={onChange}
          />
        </Sheet>
      )}

      {variant === "box" && (
        <Box
          sx={{
            ...sharedContainerStyles,
          }}
        >
          {/*<AutocompleteContent />*/}
          <Typography level={textLevel ?? "body-md"}>{name}</Typography>
          <JoyAutocomplete
            key={`autocomplete-${name}`}
            disabled={disabled}
            placeholder={placeholder}
            defaultValue={defaultValue}
            options={options}
            getOptionLabel={getOptionLabel}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            sx={{
              width: "200px",
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
            slotProps={{
              listbox: {
                sx: {
                  maxHeight: "300px",
                },
              },
            }}
            onChange={onChange}
          />
        </Box>
      )}
    </>
  );
}
