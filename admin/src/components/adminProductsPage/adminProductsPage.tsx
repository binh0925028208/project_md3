import React, { useState, useEffect, ChangeEvent } from "react";
import { Popconfirm, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./adminProductsPage.css";
import ProductService from "../../services/product.service";
import { formatPrice } from "../../common/formatPrice";
import { IProduct } from "../../types/interface";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../store/reducers/update";
import AdminUpdateProducts from "../adminUpdateModal/adminUpdate";
import AdminAddProducts from "../adminProductAddModal/adminAdd";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const Products = (): JSX.Element => {
  const productService = new ProductService();
  const [data, setData] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalAdd, setModalAdd] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState<IProduct>();
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const updateStatus = useSelector((state: any) => state.update);
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState<string>("");
  const columns: ColumnsType<IProduct> = [
    {
      title: "Image",
      dataIndex: "img",
      render: (dataIndex, record: IProduct) => (
        <img
          style={
            record.isDelete === true
              ? {
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }
              : {
                  borderRadius: "10px",
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  opacity: 0.3,
                }
          }
          src={dataIndex}
          alt=""
        />
      ),
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "productName",
      width: "20%",
      render: (dataIndex, record: any) => (
        <span
          style={
            record.isDelete === false
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {dataIndex}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (dataIndex, record: IProduct) => (
        <span
          style={
            record.isDelete === false
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          $ {dataIndex}
        </span>
      ),
      width: "15%",
      sorter: (a: any, b: any) => Number(a.price) - Number(b.price),
    },
    {
      title: "Scale",
      dataIndex: "scaleDetail",
      width: "10%",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      width: "10%",
      sorter: (a: any, b: any) => Number(a.stock) - Number(b.stock),
      render: (dataIndex, record: any) => (
        <span
          style={
            record.isDelete === false
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {dataIndex}
        </span>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (dataIndex: number, record: IProduct) => (
        <div>
          <button
            onClick={() => {
              handleGetDataEdit(record);
              setModalEdit(true);
            }}
            className="btnActionUsers"
          >
            Edit
          </button>
          {record.isDelete === true ? (
            <Popconfirm
              title="Delete this Products"
              description="Are you sure to delete it?"
              onConfirm={() => handleIsDelete(dataIndex)}
              okText="Yes"
              cancelText="No"
            >
              <button className="btnActionUsers">Delete</button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title="Re-sell this Products ?"
              description="Are you sure to re-sell it?"
              onConfirm={() => handleReSell(dataIndex)}
              okText="Yes"
              cancelText="No"
            >
              <button className="btnActionUsers">Re-sell</button>
            </Popconfirm>
          )}
        </div>
      ),
      width: "20%",
    },
  ];
  const offModalEdit = () => {
    setModalEdit(false);
  };
  const offModalAdd = () => {
    setModalAdd(false);
  };
  const handleGetDataEdit = (record: IProduct) => {
    setDataEdit(record);
  };
  const handleIsDelete = async (id: number) => {
    await productService.isDeleted(id, false);
    dispatch(update());
  };
  const handleReSell = async (id: number) => {
    await productService.isDeleted(id, false);
    dispatch(update());
  };
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const fetchData = async () => {
    setLoading(true);
    const data: any = await productService.getAll();
    setData(data);
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data.length,
      },
    });
  };

  // useEffect(() => {
  //   fetchData();
  // }, [JSON.stringify(tableParams), updateStatus]);

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IProduct>
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  const handleChangeSearchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  useEffect(() => {
    const getData = async () => {
      const result = await productService.onSearch(searchValue);
      setData(result);
    };
    setTimeout(() => {
      getData();
    }, 1000);
  }, [searchValue]);
  return (
    <section className="products">
      <div className="searchProducts">
        <input
          onChange={handleChangeSearchProducts}
          value={searchValue}
          autoFocus
          placeholder="Search by Name..."
          type="text"
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <div className="addProducts">
        {/* <button onClick={() => setModalAdd(true)} className="btnActionUsers">
          Add+ New Product
        </button> */}
      </div>
      {modalEdit ? (
        <AdminUpdateProducts dataEdit={dataEdit} offModalEdit={offModalEdit} />
      ) : null}
      {modalAdd ? <AdminAddProducts offModalAdd={offModalAdd} /> : null}
    </section>
  );
};

export default Products;
