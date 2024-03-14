"use client";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
interface MyAgGridProps extends AgGridReactProps {
  components?: AgGridReactProps["components"];
  setAgGridApi?: React.Dispatch<React.SetStateAction<any>>;
}
export default function AgGrid({
  rowData,
  columnDefs,
  components,
  defaultColDef,
  rowSelection,
  rowDragManaged,
  suppressMoveWhenRowDragging,
  onRowDragEnd,
  onRowDragEnter,
  gridOptions,
  setAgGridApi,
}: MyAgGridProps) {
  return (
    <div className="ag-theme-quartz">
      <AgGridReact
        onGridReady={param => {
          if (setAgGridApi) setAgGridApi(param.api);
        }}
        // 그리드 준비 이벤트
        gridOptions={gridOptions}
        // 그리드 옵션
        rowData={rowData}
        // 행 데이터
        columnDefs={columnDefs}
        // 컬럼 데이터
        components={components}
        // 커스텀 컴포넌트
        defaultColDef={defaultColDef}
        // 컬럼 기본 옵션
        rowSelection={rowSelection}
        // 행 선택 옵션
        rowDragManaged={rowDragManaged}
        // 행 드래그 옵션
        onRowDragEnd={onRowDragEnd}
        // 행 드래그 종료 이벤트
        onRowDragEnter={onRowDragEnter}
        // 행 드래그 진입 이벤트
        suppressMoveWhenRowDragging={suppressMoveWhenRowDragging}
        // 행 드래그 중 이동 금지
      />
    </div>
  );
}

// const Container = styled.div`
//   width: 100%;
//   height: 100%;
//   .ag-header {
//     background-color: #fff;
//     .ag-header-row {
//       &.ag-header-row-column-group {
//         background-color: #f2f2f2;
//         .ag-header-group-cell {
//           font-size: 14px;
//           border-right: 1px solid #c1c1c1;
//           .ag-header-group-cell-label {
//           }
//         }
//       }
//       &.ag-header-row-column {
//         background-color: #f2f2f2;
//         .ag-header-cell {
//           font-size: 14px;
//           border-right: 1px solid #c1c1c1;
//           .ag-header-cell-label {
//             width: 100%;
//             justify-content: center;
//           }
//         }
//       }
//     }
//   }
//   .ag-body {
//     .ag-body-viewport {
//       .ag-row {
//         &.ag-row-focus {
//         }
//         &.ag-row-hover {
//         }
//         .ag-cell {
//           display: flex;
//           border-right: 1px solid #c1c1c1;

//           &.ag-cell-focus {
//             border: none;
//             background: #8bcbff;

//             font-weight: bold;
//           }
//         }
//       }
//     }
//   }
// `;
