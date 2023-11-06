// import { appTheme } from 'src/app/theme';
// // eslint-disable-next-line import/no-unresolved
// import { ColorSwatchDialog } from '@zendeskgarden/react-colorpickers';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { convertToMatrix } from '@zendeskgarden/container-utilities';
// import { forwardRef, useState } from 'react';
// import { IconButton, Tooltip } from '@appquality/unguess-design-system';
// import { styled } from 'styled-components';
// import { Circle } from './Circle';

// const colors = [
//   { label: 'Blue-200', value: appTheme.palette.blue[200] },
//   { label: 'Blue-300', value: appTheme.palette.blue[300] },
//   { label: 'Blue-400', value: appTheme.palette.blue[400] },
//   { label: 'Blue-500', value: appTheme.palette.blue[500] },
//   { label: 'Blue-600', value: appTheme.palette.blue[600] },
//   { label: 'Blue-700', value: appTheme.palette.blue[700] },
//   { label: 'Blue-800', value: appTheme.palette.blue[800] },
//   { label: 'Red-200', value: appTheme.palette.red[200] },
//   { label: 'Red-300', value: appTheme.palette.red[300] },
//   { label: 'Red-400', value: appTheme.palette.red[400] },
//   { label: 'Red-500', value: appTheme.palette.red[500] },
//   { label: 'Red-600', value: appTheme.palette.red[600] },
//   { label: 'Red-700', value: appTheme.palette.red[700] },
//   { label: 'Red-800', value: appTheme.palette.red[800] },
//   { label: 'Yellow-200', value: appTheme.palette.yellow[200] },
//   { label: 'Yellow-300', value: appTheme.palette.yellow[300] },
//   { label: 'Yellow-400', value: appTheme.palette.yellow[400] },
//   { label: 'Yellow-500', value: appTheme.palette.yellow[500] },
//   { label: 'Yellow-600', value: appTheme.palette.yellow[600] },
//   { label: 'Yellow-700', value: appTheme.palette.yellow[700] },
//   { label: 'Yellow-800', value: appTheme.palette.yellow[800] },
//   { label: 'Green-200', value: appTheme.palette.green[200] },
//   { label: 'Green-300', value: appTheme.palette.green[300] },
//   { label: 'Green-400', value: appTheme.palette.green[400] },
//   { label: 'Green-500', value: appTheme.palette.green[500] },
//   { label: 'Green-600', value: appTheme.palette.green[600] },
//   { label: 'Green-700', value: appTheme.palette.green[700] },
//   { label: 'Green-800', value: appTheme.palette.green[800] }
// ];

// interface IPaletteIconButton {
//   iconColor: string;
// }

// const SELECTED_ROW_INDEX = 0;

// const SELECTED_COL_INDEX = 4;

// const matrix = convertToMatrix(colors, 7);

// const PaletteIconButton = forwardRef(
//   (
//     props: IPaletteIconButton & React.ComponentPropsWithoutRef<'button'>,
//     ref: React.Ref<HTMLButtonElement>
//   ) => (
//     <Tooltip content="Palette">
//       <IconButton aria-label="palette" ref={ref} style={{ color: props.iconColor }} {...props}>
//         <Circle color={props.iconColor} />
//       </IconButton>
//     </Tooltip>
//   )
// );

export const ColorPicker = () => {
  //   const [color, setColor] = useState(matrix[SELECTED_ROW_INDEX][SELECTED_COL_INDEX].value);
  //   const [rowIndex, setRowIndex] = useState(SELECTED_ROW_INDEX);
  //   const [colIndex, setColIndex] = useState(SELECTED_COL_INDEX);
  //   const [selectedRowIndex, setSelectedRowIndex] = useState(SELECTED_ROW_INDEX);
  //   const [selectedColIndex, setSelectedColIndex] = useState(SELECTED_COL_INDEX);
  //   const onChange = (rowIdx: number, colIdx: number) => {
  //     setRowIndex(rowIdx);
  //     setColIndex(colIdx);
  //   };
  //   const onSelect = (rowIdx: number, colIdx: number) => {
  //     setSelectedRowIndex(rowIdx);
  //     setSelectedColIndex(colIdx);
  //     setColor(matrix[rowIdx][colIdx].value);
  //   };
  // return (
  //     <ColorSwatchDialog
  //       colors={matrix}
  //       onChange={onChange}
  //       onSelect={onSelect}
  //       rowIndex={rowIndex}
  //       colIndex={colIndex}
  //       selectedRowIndex={selectedRowIndex}
  //       selectedColIndex={selectedColIndex}
  //     >
  //       <PaletteIconButton iconColor={color} />
  //     </ColorSwatchDialog>
  // );
};
