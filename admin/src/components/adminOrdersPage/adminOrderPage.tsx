import React, { useState, useEffect, ChangeEvent } from "react";
import { Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import "./adminOrderPage.css";
import OrderService from "../../services/order.service";
import { IOrder } from "../../types/interface";
import { formatPrice } from "../../common/formatPrice";
import OrderDetail from "../adminOrdersPageDetail/adminOrderDetail";

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

const AdminOrders = (): JSX.Element => {
  const [onOrderDetails, setOnOrderDetails] = useState<boolean>(false);
  const [orderById, setOrderById] = useState<IOrder>();
  const columns: ColumnsType<IOrder> = [
    {
      title: "User Name",
      dataIndex: "userName",
      width: "20%",
    },
    {
      title: "Date of order",
      dataIndex: "date",
      width: "20%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "20%",
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      render: (dataIndex) => <span>$ {dataIndex}</span>,
      width: "15%",
      sorter: (a: any, b: any) => Number(a.totalPrice) - Number(b.totalPrice),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      render: (dataIndex, record: IOrder) => (
        <select
          onChange={(e) => onChangeStatus(e, Number(record.id))}
          className="selectStatus"
        >
          <option value="1">Working on...</option>
          <option value="2">Shipping...</option>
          <option value="3">Completed</option>
        </select>
      ),
    },
    {
      title: "Product",
      dataIndex: "id",
      render: (id) => (
        <div>
          <button
            onClick={() => {
              setOnOrderDetails(true);
              handleGetOrderById(id);
            }}
            className="btnActionUsers"
          >
            View
          </button>
        </div>
      ),
      width: "10%",
    },
  ];
  const onChangeStatus = async (
    e: ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    await orderService.changeStatusOrder(id, Number(e.target.value));
  };
  const handleGetOrderById = async (id: number) => {
    const data = await orderService.getOrderById(id);
    setOrderById(data);
  };
  const offOrderDetails = () => {
    setOnOrderDetails(false);
  };
  const orderService = new OrderService();
  const [data, setData] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [valueSearchOrder, setValueSearchOrder] = useState<string>("");
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = async () => {
    setLoading(true);
    const data: any = await orderService.getAllOrders();
    setData(data.reverse());
    setLoading(false);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: data.length,
      },
    });
  };

  const handleTableChange: any = (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue>,
    sorter: SorterResult<IOrder>
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
  const handleSearchOrder = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setValueSearchOrder(e.target.value);
    } else {
      setValueSearchOrder("");
    }
  };
  useEffect(() => {
    const getData = async () => {
      const data = await orderService.searchOrderByDate(valueSearchOrder);
      setData(data);
    };
    getData();
  }, [valueSearchOrder]);

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);
  return (
    <section className="orders">
      <div className="searchOrders">
        <input
          autoFocus
          onChange={handleSearchOrder}
          value={valueSearchOrder}
          placeholder="Search by date..."
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
      {onOrderDetails ? (
        <OrderDetail orderById={orderById} offOrderDetails={offOrderDetails} />
      ) : null}
    </section>
  );
};

export default AdminOrders;
