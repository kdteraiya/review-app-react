import React, { useState, useEffect, useRef, memo } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Link } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";

function ViewListing() {
  const toastViewListing = useRef(null);
  const [reviews, setReviews] = useState();
  const [visible, setVisible] = useState(false);
  const [dataToDelete, setDataToDelete] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lazyState, setlazyState] = useState({
    first: 0,
    rows: 10,
    page: 1,
    sortField: null,
    sortOrder: null,
  });

  useEffect(() => {
    let existingData = localStorage.getItem("reviewData");
    if (existingData) setReviews(JSON.parse(existingData));
    setLoading(false);
  }, []);

  const onSort = (event) => {
    setlazyState(event);
  };

  const handleRowDelete = (row) => {
    let filteredData = reviews.filter((ele) => ele.id !== row.id);
    setReviews(filteredData);
    localStorage.setItem("reviewData", JSON.stringify(filteredData));
    setDataToDelete(null);
  };

  const accept = () => {
    handleRowDelete(dataToDelete);
  };

  const ratingBodyTempalte = (row) => {
    let html = "";
    for (let i = 0; i < row.rating; i++) {
      html = html + '<span class="p-rating-icon pi pi-star-fill"></span>';
    }
    return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
  };

  const actionButtonTemplate = (row) => (
    <>
      <div className="action-buttons">
        <Link state={row} to={`/add-review/`}>
          <Button
            label="Edit"
            type="button"
            icon="pi pi-pencil"
            severity="secondary"
          />
        </Link>
        <Button
          label="Delete"
          type="button"
          icon="pi pi-times"
          severity="secondary"
          onClick={() => {
            setVisible(true);
            setDataToDelete(row);
          }}
        />
      </div>
    </>
  );

  return (
    <div className="view-listing">
      <Toast ref={toastViewListing} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        message="Are you sure you want to delete?"
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        accept={accept}
      />
      <DataTable
        dataKey="id"
        sortField="id"
        sortOrder={-1}
        emptyMessage="No reviews found."
        scrollable
        value={reviews}
        paginator
        // style={{ minWidth: "10rem" }}
        rows={10}
        loading={loading}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        rowsPerPageOptions={[10, 25, 50, 100]}
      >
        <Column
          field="id"
          header="ID"
          frozen
          sortable
          style={{ minWidth: "3rem" }}
          lazy
          responsiveLayout="scroll"
          dataKey="id"
          paginator
          onSort={onSort}
          sortField={lazyState.sortField}
          sortOrder={lazyState.sortOrder}
        />
        <Column
          field="name"
          header="Name"
          sortable
          style={{ minWidth: "10rem" }}
        />

        <Column
          field="email"
          header="Email"
          sortable
          style={{ minWidth: "10rem" }}
        />

        <Column
          field="rating"
          header="Rating"
          sortable
          body={ratingBodyTempalte}
          style={{ minWidth: "10rem" }}
        />

        <Column
          field="Action"
          header="Action"
          frozen
          alignFrozen="right"
          body={actionButtonTemplate}
          style={{ minWidth: "18rem" }}
        />
      </DataTable>
    </div>
  );
}

export default memo(ViewListing);
