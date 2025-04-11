declare module '@mui/material' {
  import * as React from 'react';
  
  export const Button: React.ComponentType<any>;
  export const TextField: React.ComponentType<any>;
  export const Typography: React.ComponentType<any>;
  export const Box: React.ComponentType<any>;
  export const Grid: React.ComponentType<any>;
  export const IconButton: React.ComponentType<any>;
  export const FormControl: React.ComponentType<any>;
  export const FormControlLabel: React.ComponentType<any>;
  export const Checkbox: React.ComponentType<any>;
  export const MenuItem: React.ComponentType<any>;
  export const Select: React.ComponentType<any>;
  export const InputLabel: React.ComponentType<any>;
  export const Slider: React.ComponentType<any>;
  // Voeg andere componenten toe indien nodig
}

declare module '@mui/icons-material/Delete' {
  import * as React from 'react';
  const DeleteIcon: React.ComponentType<any>;
  export default DeleteIcon;
}

declare module '@mui/icons-material/Add' {
  import * as React from 'react';
  const AddIcon: React.ComponentType<any>;
  export default AddIcon;
} 