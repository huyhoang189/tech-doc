import React from "react";
import { Button, Tooltip } from "antd";
import { getRole } from "../utils/auth";

/**
 * RoleButton
 * @param {"create"|"update"|"delete"|"detail"} type - Loại thao tác
 * @param {React.ReactNode} children - Nội dung hiển thị trên nút
 * @param {Function} onClick - Sự kiện khi nhấn
 * @param {Object} rest - Các props khác của Antd Button
 */
const RoleButton = ({ type = "detail", children, onClick, ...rest }) => {
  const role = getRole();

  // Xác định có cho phép hiển thị nút hay không
  const isCUD = ["create", "update", "delete"].includes(type);
  const isAllowed = !isCUD || role === "ADMIN";

  if (!isAllowed) return null;

  // Màu theo loại
  let colorProps = {};
  switch (type) {
    case "create":
      colorProps.type = "primary";
      break;
    case "update":
      colorProps.style = {
        backgroundColor: "#faad14",
        color: "#fff",
        border: "none",
      }; // vàng
      break;
    case "delete":
      colorProps.danger = true;
      break;
    default:
      colorProps = {}; // detail hoặc mặc định
  }

  return (
    <Tooltip title={!isAllowed ? "for Admin" : ""}>
      <Button onClick={onClick} {...colorProps} {...rest}>
        {children}
      </Button>
    </Tooltip>
  );
};

export default RoleButton;
