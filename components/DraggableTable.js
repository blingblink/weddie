import React, { useState, useCallback } from "react";
import DraggableTableRow from "./DraggableTableRow";
import styled from "styled-components";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

const arrayMoveMutate = (array, from, to) => {
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
};

const arrayMove = (array, from, to) => {
  array = array.slice();
  arrayMoveMutate(array, from, to);
  return array;
};

const MyTableWrapper = styled.div`
  padding: 10px;

  .fixed_header {
    width: 800px;
    table-layout: fixed;
    border-collapse: collapse;

    & > tbody {
      display: block;
      width: 807px;
      overflow: auto;
      height: 400px;
      cursor: grabbing;
      background: grey;
    }

    & > thead {
      background: yellow;
      color: black;

      & > tr {
        display: block;
      }
    }

    & > thead th,
    & > tbody td {
      padding: 5px;
      text-align: left;
      width: 200px;
      border: 1px solid #000;
    }
  }
`;

const SortableCont = SortableContainer(({ children }) => {
  return <tbody>{children}</tbody>;
});

const SortableItem = SortableElement(props => <DraggableTableRow {...props} />);

const DraggableTable = ({ columns, values }) => {
  const [items, setItems] = useState(values);

  const onSortEnd = useCallback(({ oldIndex, newIndex }) => {
    setItems(oldItems => arrayMove(oldItems, oldIndex, newIndex));
  }, []);

  return (
    <MyTableWrapper>
      <table className="table table-dark fixed_header">
        <thead>
          <tr>
            {columns.map(col => <th>{col}</th>)}
          </tr>
        </thead>
        <SortableCont
          onSortEnd={onSortEnd}
          axis="y"
          lockAxis="y"
          lockToContainerEdges={true}
          lockOffset={["30%", "50%"]}
          helperClass="helperContainerClass"
          useDragHandle={true}
        >
          {items.map((value, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              values={value}
            />
          ))}
        </SortableCont>
      </table>
    </MyTableWrapper>
  );
};

export default DraggableTable;
